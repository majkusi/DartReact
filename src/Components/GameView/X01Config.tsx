import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";

interface MatchResponse {
  gameId: string;
}
interface MatchRequest {
  GameType: number;
  X01TypeEnum: number;
  PlayersName: string[];
  TeamsMode: boolean;
  Score: number;
}

const createMatch = async (request: MatchRequest): Promise<MatchResponse> => {
  const response = await fetch("https://localhost:5001/api/Match", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("Error, try again. " + response);
  }
  return response.json();
};

const X01Config = () => {
  const [numPlayers, setNumPlayers] = useState(1);
  const [teamsMode, setTeamsMode] = useState(false);
  const [X01TypeEnum, setX01TypeEnum] = useState("");

  const navigate = useNavigate();

  const mutation = useMutation<MatchResponse, Error, MatchRequest>({
    mutationFn: createMatch,
    onSuccess: (data) => {
      localStorage.setItem("GameId", JSON.parse(data.toString()));
      navigate("/game");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const listOfPlayers: string[] = [];

    for (let i = 1; i <= numPlayers; i++) {
      const name = formData.get(`player_${i}`) as string;
      listOfPlayers.push(name);
    }

    mutation.mutate({
      GameType: 1,
      X01TypeEnum: Number(X01TypeEnum),
      PlayersName: listOfPlayers,
      TeamsMode: teamsMode,
      Score: 501,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full max-w-md p-8 space-y-6 bg-black rounded-3xl shadow-[0_0_25px_cyan] border border-cyan-600"
      >
        <h1 className="text-2xl font-bold text-white text-center">
          X01 Game Mode Creator
        </h1>

        {/* Number of players */}
        <div className="flex flex-col items-center space-y-2 w-full">
          <p className="text-white font-semibold">Number of Players</p>
          <div className="flex items-center justify-center space-x-4">
            <button
              type="button"
              onClick={() => setNumPlayers((prev) => Math.max(1, prev - 1))}
              disabled={numPlayers <= 1}
              className="bg-gray-800 hover:bg-cyan-700 text-white font-bold px-4 py-2 rounded-xl transition disabled:opacity-50"
            >
              −
            </button>
            <span className="text-white font-bold text-xl w-12 text-center">
              {numPlayers}
            </span>
            <button
              type="button"
              onClick={() => setNumPlayers((prev) => Math.min(8, prev + 1))}
              disabled={numPlayers >= 8}
              className="bg-gray-800 hover:bg-cyan-700 text-white font-bold px-4 py-2 rounded-xl transition disabled:opacity-50"
            >
              +
            </button>
          </div>
        </div>

        {/* Player names */}
        {numPlayers > 1 && (
          <div className="flex flex-col items-center w-full space-y-2">
            <p className="text-white font-semibold text-lg">Player Names</p>
            {[...Array(numPlayers)].map((_, index) => (
              <input
                key={index}
                type="text"
                name={`player_${index + 1}`}
                defaultValue={`Player ${index + 1}`}
                className="w-full px-4 py-2 rounded-xl bg-gray-900 text-white text-center border border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            ))}
          </div>
        )}

        {/* X01 in/out options */}
        <div className="flex flex-col items-center w-full space-y-2">
          <p className="text-white font-semibold">Type of In/Out</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { id: "doubleInOption", label: "DI/DO", value: 0 },
              { id: "openInOption", label: "DI/SO", value: 1 },
              { id: "doubleOutOption", label: "SI/DO", value: 2 },
              { id: "openOutOption", label: "SI/SO", value: 3 },
            ].map((opt) => (
              <label
                key={opt.id}
                className="flex items-center cursor-pointer text-white bg-gray-900 px-4 py-2 rounded-xl hover:bg-cyan-600 transition border border-cyan-600"
              >
                <input
                  type="radio"
                  name="gameOption"
                  id={opt.id}
                  value={opt.value}
                  onChange={(e) => setX01TypeEnum(e.target.value)}
                  className="mr-2 accent-cyan-400"
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>
        {/* Teams Mode toggle */}
        <div className="flex flex-col items-center w-full">
          <p className="text-white font-semibold">Team Mode</p>
          <label className="inline-flex items-center cursor-pointer mt-2">
            <input
              type="checkbox"
              checked={teamsMode}
              onChange={(e) => setTeamsMode(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-14 h-7 bg-gray-900 rounded-full peer-checked:bg-cyan-500 relative transition border border-cyan-600">
              <div className="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full peer-checked:translate-x-full transition"></div>
            </div>
          </label>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="px-6 py-2 bg-cyan-600 hover:bg-green-500 text-white rounded-xl font-semibold shadow-[0_0_15px_cyan] transition transform hover:scale-105"
        >
          Start Match
        </button>
      </form>
    </div>
  );
};

export default X01Config;
