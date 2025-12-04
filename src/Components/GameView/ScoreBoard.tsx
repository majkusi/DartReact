import { useState } from "react";

interface ScoreBoardProps {
  selectedPlayerUsername?: string;
}
interface CreateRoundRequest {
  gameId: number;
  roundNumber: number;
  points: number;
  playerUsername?: string;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ selectedPlayerUsername }) => {
  const [input, setInput] = useState<string>("");

  const handleButtonClick = (value: string) => {
    const newValue = parseInt(input + value, 10);
    if (newValue <= 180) setInput(input + value);
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
        gameId: parseInt(gameId || "0"),
        roundNumber: 0,
        points,
        playerUsername: selectedPlayerUsername,
      };
      const res = await fetch("https://localhost:5001/api/Round", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const text = await res.text();
        console.error(res.status, text);
        throw new Error("Failed");
      }
      setInput("");
    } catch (e) {
      console.error(e);
      alert("Failed to create round");
    }
  };

  return (
    <div className="flex flex-row items-start justify-center text-cyan-400 p-6 bg-black rounded-3xl shadow-[0_0_25px_cyan] border border-green-400 gap-6 w-max">
      {/* Input + Actions */}
      <div className="flex flex-col items-center gap-4">
        <h4 className="text-lg font-semibold">
          Input: <span className="text-green-400">{input || "—"}</span>
        </h4>
        <div className="flex gap-3">
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-green-400 hover:bg-cyan-400 text-black rounded-xl shadow-[0_0_15px_green] font-semibold transition transform hover:scale-105"
          >
            Next
          </button>
          <button
            onClick={handleRevert}
            className="px-6 py-2 bg-cyan-400 hover:bg-green-400 text-black rounded-xl shadow-[0_0_15px_cyan] font-semibold transition transform hover:scale-105"
          >
            Revert
          </button>
        </div>
      </div>

      {/* Number Pad */}
      <div className="grid grid-cols-5 gap-3">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((n) => (
          <button
            key={n}
            onClick={() => handleButtonClick(n.toString())}
            className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-green-400 hover:from-green-400 hover:to-cyan-500 text-black font-bold rounded-xl shadow-[0_0_10px_cyan] transition-transform transform hover:scale-110"
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScoreBoard;
