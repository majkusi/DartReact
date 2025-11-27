
import React, { useEffect, useRef, useState } from "react";
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
}



const PlayerCard: React.FC = () => {
  const gameId = localStorage.getItem("GameId") || "";
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const [gameState, setGameState] = useState<ServerGameState | null>(null);


useEffect(() => {
  if (!gameId) return;

  const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:5001/hubs/match")
    .withAutomaticReconnect()
    .build();

  connection.on("GameStateUpdated", (state) => setGameState(state));

  const start = async () => {
    try {
      if (connection.state === signalR.HubConnectionState.Disconnected) {
        await connection.start();
        await connection.invoke("JoinGame", Number(gameId));
      }
    } catch (err) {
      console.error("SignalR connection failed", err);
    }
  };

  start();
  connectionRef.current = connection;

  return () => {
    connection.stop();
  };
}, [gameId]);


  if (!gameState) return <div className="text-white">Waiting for game state...</div>;

  return (
    <div className="flex gap-6 justify-center w-full">
      {gameState.teams.map((team) => (
        <div key={team.id} className="p-4 bg-gray-900 border border-gray-700 rounded-2xl shadow-lg">
          <h2 className="text-center text-xl font-bold mb-4 text-white">
            Team {team.teamNumber}
          </h2>
          <div className={`flex ${team.players.length > 1 ? "flex-row" : "flex-col"} gap-4`}>
            {team.players.map((player) => (
              <div
                key={player.id}
                className={`cursor-pointer flex flex-col items-center text-center rounded-2xl p-4 m-3 w-48
                ${player.playerUsername === gameState.currentPlayer
                  ? "bg-blue-700 border-blue-400 scale-105"
                  : "bg-gray-800 border-gray-600"} border-2 shadow-lg`}
              >
                <h1 className="text-lg text-white font-bold">
                  {player.playerUsername} {player.playerUsername === gameState.currentPlayer ? "🟢" : "🔴"}
                </h1>
                <h2 className="text-3xl font-extrabold mt-3 text-white">{player.individualScore}</h2>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayerCard;
