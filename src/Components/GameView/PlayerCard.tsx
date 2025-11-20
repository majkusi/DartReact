import React from "react";
import { useQuery } from "@tanstack/react-query";

// ---------- TYPES ----------
interface PropsTypes {
  playerName: string;
  playerId: number;
  playerScore: number;
  isPlayerTurn: boolean;
}

export interface PlayerData {
  id: number;
  teamId: number;
  playerUsername: string;
  individualScore: number;
}

export interface TeamData {
  id: number;
  teamNumber: number;
  gameId: number;
  score: number;
  players: PlayerData[];
}

// API response could be: { teams: [...] } or directly array of teams
export type TeamResponse = TeamData[] | { teams: TeamData[] };

// ---------- FETCH FUNCTION ----------
const fetchTeams = async (gameId: string): Promise<TeamResponse> => {
  const res = await fetch(`https://localhost:5001/api/Team/${gameId}`);
  if (!res.ok) throw new Error("Failed to fetch teams");
  return res.json();
};

// ---------- MAIN COMPONENT ----------
const PlayerCard: React.FC = () => {
  const gameId = localStorage.getItem("GameId") || "";
  console.log(gameId);
  const { data, isLoading, error } = useQuery<TeamResponse>({
    queryKey: ["teams", gameId],
    queryFn: () => fetchTeams(gameId),
    enabled: !!gameId,
  });

  if (isLoading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-400">Error loading teams</div>;

  const teams: TeamData[] = Array.isArray(data) ? data : data?.teams ?? [];
  const isTeamMode = teams.some((t) => t.players.length > 1);

  return (
    <div className="flex gap-6 justify-center w-full">
      {teams.map((team) => (
        <div
          key={team.id}
          className="p-4 bg-gray-900 border border-gray-700 rounded-2xl shadow-lg"
        >
          <h2 className="text-center text-xl font-bold mb-4 text-white">
            Team {team.teamNumber}
          </h2>

          <div className={`flex ${isTeamMode ? "flex-row" : "flex-col"} gap-4`}>
            {team.players.map((player) => (
              <Card
                key={player.id}
                playerName={player.playerUsername}
                playerId={player.id}
                playerScore={player.individualScore}
                isPlayerTurn={false}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayerCard;
// ---------- SMALL COMPONENTS ----------
function PlayerTurn({ isPlayerTurn }: Pick<PropsTypes, "isPlayerTurn">) {
  return (
    <span
      className={`ml-2 text-lg ${
        isPlayerTurn ? "text-green-400" : "text-red-500"
      }`}
    >
      {isPlayerTurn ? "🟢" : "🔴"}
    </span>
  );
}

const Card: React.FC<PropsTypes> = ({
  playerName,
  playerId,
  playerScore,
  isPlayerTurn,
}) => {
  return (
    <div
      key={playerId}
      className={`flex flex-col justify-between items-center text-center rounded-2xl p-4 m-3 w-48 transition-all duration-300
      ${
        isPlayerTurn
          ? "bg-linear-to-b from-blue-800 to-blue-600 border-blue-400 shadow-blue-500/40 scale-105"
          : "bg-gray-800 border-gray-600"
      }
      border-2 shadow-lg`}
    >
      <h1 className="text-lg font-bold tracking-wide flex items-center justify-center">
        {playerName}
        <PlayerTurn isPlayerTurn={isPlayerTurn} />
      </h1>

      <h2
        className={`text-3xl font-extrabold mt-3 ${
          isPlayerTurn ? "text-white" : "text-gray-300"
        }`}
      >
        {playerScore}
      </h2>
    </div>
  );
};
