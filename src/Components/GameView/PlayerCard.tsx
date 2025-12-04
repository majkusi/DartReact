import React, { useEffect, useRef, useState, useMemo } from "react";
import * as signalR from "@microsoft/signalr";

interface PlayerData {
  id: number;
  teamId: number;
  playerUsername: string;
  individualScore: number;
}

interface TeamData {
  id: number;
  teamNumber: number;
  gameId: number;
  score: number;
  players: PlayerData[];
}

interface ServerGameState {
  gameId: number;
  turnOrder: string[];
  currentPlayer: string;
  teams: TeamData[];
  finished: boolean;
  winnerUsername: string;
}

interface PlayerCardProps {
  selectedPlayerUsername?: string;
  onSelectPlayer: (username: string) => void;
  onGameFinished?: (finished: boolean, winner: string) => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  selectedPlayerUsername,
  onSelectPlayer,
  onGameFinished,
}) => {
  const gameId = localStorage.getItem("GameId") || "";
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const onGameFinishedRef =
    useRef<PlayerCardProps["onGameFinished"]>(onGameFinished);
  const onSelectPlayerRef =
    useRef<PlayerCardProps["onSelectPlayer"]>(onSelectPlayer);

  useEffect(() => {
    onGameFinishedRef.current = onGameFinished;
  }, [onGameFinished]);
  useEffect(() => {
    onSelectPlayerRef.current = onSelectPlayer;
  }, [onSelectPlayer]);

  const [gameState, setGameState] = useState<ServerGameState | null>(null);

  useEffect(() => {
    if (!gameId) return;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:5001/api/hubs/match", {
        transport: signalR.HttpTransportType.WebSockets,
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    connection.keepAliveIntervalInMilliseconds = 5 * 1000;
    connection.serverTimeoutInMilliseconds = 20 * 1000;

    const handleGameStateUpdated = (state: ServerGameState) => {
      setGameState(state);
      if (state.finished)
        onGameFinishedRef.current?.(true, state.winnerUsername);
      if (
        state.currentPlayer &&
        state.currentPlayer !== selectedPlayerUsername
      ) {
        onSelectPlayerRef.current?.(state.currentPlayer);
        localStorage.setItem("StartingPlayerUsername", state.currentPlayer);
      }
    };

    connection.on("GameStateUpdated", handleGameStateUpdated);
    connection.onreconnected(async () => {
      try {
        await connection.invoke("JoinGame", Number(gameId));
      } catch (err) {
        console.error(err);
      }
    });

    const start = async () => {
      try {
        if (connection.state === signalR.HubConnectionState.Disconnected) {
          await connection.start();
          await connection.invoke("JoinGame", Number(gameId));
        }
      } catch (e) {
        console.log((e as Error).message);
      }
    };

    start();
    connectionRef.current = connection;

    return () => {
      connection.off("GameStateUpdated", handleGameStateUpdated);
      connection.stop();
    };
  }, [gameId, selectedPlayerUsername]);

  const currentPlayer = useMemo(
    () => selectedPlayerUsername ?? gameState?.currentPlayer ?? null,
    [selectedPlayerUsername, gameState]
  );

  if (!gameState)
    return (
      <div className="text-cyan-400 text-lg font-semibold animate-pulse">
        Waiting for game state...
      </div>
    );

  return (
    <div className="flex flex-wrap gap-8 justify-center w-full">
      {gameState.teams.map((team) => (
        <div
          key={team.id}
          className="p-6 bg-black border border-cyan-600 rounded-3xl shadow-[0_0_20px_cyan] w-96"
        >
          <h2 className="text-center text-2xl font-bold mb-6 text-cyan-400 tracking-wide">
            Team {team.teamNumber}
          </h2>
          <div className={`flex flex-row gap-2 justify-center`}>
            {team.players.map((player) => (
              <div
                className={`cursor-default flex flex-col items-center justify-center text-center rounded-2xl p-4 w-36 transition-transform duration-300
                      ${
                        player.playerUsername === currentPlayer
                          ? "bg-gradient-to-br from-cyan-500 to-green-400 border-green-400 scale-105 shadow-[0_0_15px_cyan,0_0_25px_green]"
                          : "bg-gray-900 border-cyan-600"
                      } border-2`}
              >
                <h1
                  className={`text-sm md:text-base font-semibold ${
                    player.playerUsername === currentPlayer
                      ? "text-cyan-400"
                      : "text-white" // inactive players name white
                  }`}
                >
                  {player.playerUsername}{" "}
                  {player.playerUsername === currentPlayer ? "🟢" : "🔴"}
                </h1>
                <h2
                  className={`text-2xl md:text-3xl font-extrabold mt-2 ${
                    player.playerUsername === currentPlayer
                      ? "text-green-400" // active score green
                      : "text-white" // inactive score white
                  }`}
                >
                  {player.individualScore}
                </h2>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayerCard;
