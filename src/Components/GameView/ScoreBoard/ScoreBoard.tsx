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
    <div>
      <div className="mb-3">
        <h4>Input: {input}</h4>
      </div>
      <div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
          <button
            key={number}
            className="btn btn-primary m-1"
            onClick={() => handleButtonClick(number.toString())}
          >
            {number}
          </button>
        ))}
      </div>
      <div>
        <button
          className="btn btn-success mt-2"
          onClick={() => alert(`Next clicked with input: ${input}`)}
        >
          Next
        </button>
        <button
          className="btn btn-danger mt-2 ms-2"
          onClick={() => handleRevert()}
        >
          Revert
        </button>
      </div>
    </div>
  );
};

export default ScoreBoard;
