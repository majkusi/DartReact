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

      if (state.finished) {
        if (typeof onGameFinishedRef.current === "function") {
          onGameFinishedRef.current(true, state.winnerUsername);
        } else {
          console.warn("onGameFinished is not provided or not a function");
        }
      }

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
        console.error("Failed to re-join after reconnect:", err);
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

  const currentPlayer = useMemo(() => {
    return selectedPlayerUsername ?? gameState?.currentPlayer ?? null;
  }, [selectedPlayerUsername, gameState]);

  if (!gameState)
    return <div className="text-white">Waiting for game state...</div>;

  return (
    <div className="flex gap-6 justify-center w-full">
      {gameState.teams.map((team) => (
        <div
          key={team.id}
          className="p-4 bg-gray-900 border border-gray-700 rounded-2xl shadow-lg"
        >
          <h2 className="text-center text-xl font-bold mb-4 text-white">
            Team {team.teamNumber}
          </h2>
          <div
            className={`flex ${
              team.players.length > 1 ? "flex-row" : "flex-col"
            } gap-4`}
          >
            {team.players.map((player) => (
              <div
                key={player.id}
                onClick={() =>
                  onSelectPlayerRef.current?.(player.playerUsername)
                }
                className={`cursor-pointer flex flex-col items-center text-center rounded-2xl p-4 m-3 w-48
                ${
                  player.playerUsername === currentPlayer
                    ? "bg-blue-700 border-blue-400 scale-105"
                    : "bg-gray-800 border-gray-600"
                } border-2 shadow-lg
                `}
              >
                <h1 className="text-lg text-white font-bold">
                  {player.playerUsername}{" "}
                  {player.playerUsername === currentPlayer ? "🟢" : "🔴"}
                </h1>
                <h2 className="text-3xl font-extrabold mt-3 text-white">
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
