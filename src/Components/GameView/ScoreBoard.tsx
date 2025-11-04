import { useState } from "react";

const ScoreBoard = () => {
  const [input, setInput] = useState<string>("");

  const handleButtonClick = (value: string) => {
    const newValue = parseInt(input + value, 10);
    if (newValue <= 180) {
      setInput(input + value);
    }
  };

  const handleRevert = () => {
    setInput("");
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
          onClick={() => alert(`Next clicked with input: ${input}`)}
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
