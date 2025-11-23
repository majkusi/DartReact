import React, { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

// ---------- TYPES ----------
interface PropsTypes {
  playerName: string;
  playerScore: number;
  isPlayerTurn: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
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

export type TeamResponse = TeamData[] | { teams: TeamData[] };

const fetchTeams = async (gameId: string): Promise<TeamResponse> => {
  const res = await fetch(`https://localhost:5001/api/Team/${gameId}`);
  if (!res.ok) throw new Error("Failed to fetch teams");
  return res.json();
};

interface PlayerCardProps {
  selectedPlayerId?: string;
  onSelectPlayer?: (username: string) => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  selectedPlayerId,
  onSelectPlayer,
}) => {
  const gameId = localStorage.getItem("GameId") || "";
  const { data, isLoading, error } = useQuery<TeamResponse>({
    queryKey: ["teams", gameId],
    queryFn: () => fetchTeams(gameId),
    enabled: !!gameId,
  });

  const teams: TeamData[] = useMemo(
    () => (Array.isArray(data) ? data : data?.teams ?? []),
    [data]
  );
  const isTeamMode = teams.some((t) => t.players.length > 1);

  // Build turn order: iterate player index (0..maxPlayers-1) and push each team's playerUsername at that index
  const computeTurnOrder = (teamsArr: TeamData[]) => {
    const maxPlayers = teamsArr.reduce(
      (max, t) => Math.max(max, t.players.length),
      0
    );
    const order: string[] = [];
    for (let i = 0; i < maxPlayers; i++) {
      for (const team of teamsArr) {
        const p = team.players[i];
        if (p) order.push(p.playerUsername);
      }
    }
    return order;
  };

  useEffect(() => {
    // When teams load, ensure a TurnOrder exists in localStorage and reset if teams changed
    const newOrder = computeTurnOrder(teams);
    try {
      const stored = localStorage.getItem("TurnOrder");
      if (!stored || stored !== JSON.stringify(newOrder)) {
        localStorage.setItem("TurnOrder", JSON.stringify(newOrder));
        localStorage.setItem("TurnIndex", "0");
        if (onSelectPlayer && newOrder.length) onSelectPlayer(newOrder[0]);
      } else {
        // ensure index is valid
        const idx = parseInt(localStorage.getItem("TurnIndex") || "0", 10);
        if (isNaN(idx) || idx >= newOrder.length) {
          localStorage.setItem("TurnIndex", "0");
          if (onSelectPlayer && newOrder.length) onSelectPlayer(newOrder[0]);
        }
      }
    } catch (e) {
      // ignore localStorage parsing errors
      console.error("TurnOrder sync failed", e);
    }
  }, [teams, onSelectPlayer]);

  // Determine the current player username from stored TurnOrder/TurnIndex
  const getCurrentPlayerUsername = (): string | undefined => {
    try {
      const order = JSON.parse(
        localStorage.getItem("TurnOrder") || "[]"
      ) as string[];
      const idx = parseInt(localStorage.getItem("TurnIndex") || "0", 10);
      if (!Array.isArray(order) || order.length === 0) return undefined;
      const safeIdx = isNaN(idx)
        ? 0
        : Math.max(0, Math.min(idx, order.length - 1));
      return order[safeIdx];
    } catch {
      console.log("returned undefined in getCurrentPlayerUsername");
      return undefined;
    }
  };

  const currentPlayerUsername = getCurrentPlayerUsername();

  if (isLoading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-400">Error loading teams</div>;

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
                playerScore={player.individualScore}
                isPlayerTurn={player.playerUsername === currentPlayerUsername}
                isSelected={selectedPlayerId === player.playerUsername}
                onSelect={() =>
                  onSelectPlayer && onSelectPlayer(player.playerUsername)
                }
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayerCard;

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
  playerScore,
  isPlayerTurn,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer flex flex-col justify-between items-center text-center rounded-2xl p-4 m-3 w-48 transition-all duration-300
      ${
        isPlayerTurn
          ? "bg-linear-to-b from-blue-800 to-blue-600 border-blue-400 shadow-blue-500/40 scale-105"
          : "bg-gray-800 border-gray-600"
      }
      border-2 shadow-lg ${isSelected ? "ring-2 ring-blue-400 scale-105" : ""}`}
    >
      <h1 className="text-lg text-white font-bold tracking-wide flex items-center justify-center">
        {playerName}
        <PlayerTurn isPlayerTurn={isPlayerTurn} />
      </h1>

      <h2 className="text-3xl font-extrabold mt-3 text-white">{playerScore}</h2>
    </div>
  );
};
