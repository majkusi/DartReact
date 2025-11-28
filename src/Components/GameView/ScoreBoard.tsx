import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface ScoreBoardProps {
  selectedPlayerUsername?: string;
  onSelectPlayer?: (username: string) => void;
}

interface CreateRoundRequest {
  gameId: number;
  roundNumber: number;
  points: number;
  playerUsername?: string;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({
  selectedPlayerUsername,
  onSelectPlayer,
}) => {
  const [input, setInput] = useState<string>("");
  const qc = useQueryClient();

  const handleButtonClick = (value: string) => {
    const newValue = parseInt(input + value, 10);
    if (newValue <= 180) {
      setInput(input + value);
    }
  };

  const handleRevert = () => setInput("");


const handleNext = async () => {
  if (!selectedPlayerUsername) {
    alert("Please select a player first");
    return;
  }

  const points = parseInt(input, 10);
  if (!points || points <= 0) {
    alert("Enter a valid point value");
    return;
  }

  const gameId = localStorage.getItem("GameId") || "";

  try {
    const payload: CreateRoundRequest = {
      gameId: parseInt(gameId || "0", 10),
      roundNumber: 0,
      points: points,
      playerUsername: selectedPlayerUsername,
    };

    const res = await fetch("https://localhost:5001/api/Round", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("CreateRound failed:", res.status, text);
      throw new Error("Failed to create round on server");
    }

    setInput("");
    // ✅ No need to manually update turn or invalidate queries
    // SignalR will push the new state to PlayerCard
  } catch (e) {
    console.error(e);
    alert("Failed to create round. Check console for details.");
  }
};


  return (
    <div className="flex flex-col items-center justify-center text-white space-y-4 p-6 bg-gray-900 rounded-xl shadow-lg border-blue-400 border-2 m-5">
      {/* Display current input */}
      <div>
        <h4 className="text-lg font-semibold">
          Input: <span className="text-blue-400">{input || "—"}</span>
        </h4>
      </div>

      {/* Number buttons */}
      <div className="flex flex-wrap justify-center gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
          <button
            key={number}
            onClick={() => handleButtonClick(number.toString())}
            className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md shadow-md transition"
          >
            {number}
          </button>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleNext}
          className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md shadow-md font-semibold transition"
        >
          Next
        </button>
        <button
          onClick={handleRevert}
          className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md shadow-md font-semibold transition"
        >
          Revert
        </button>
      </div>
    </div>
  );
};

export default ScoreBoard;
