import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router";

interface MatchResponse {
  GameId: string;
}
interface MatchRequest {
  gameType: string;
  X01TypeEnum: string;
  playersName: string[];
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
  const [doubleBull, setDoubleBull] = useState(false);
  const [numPlayers, setNumPlayers] = useState(1);

  const gameType = "X01";
  const [X01TypeEnum, setX01TypeEnum] = useState("");
  const [playersName, setPlayersName] = useState(Array(0));

  const mutation = useMutation<MatchResponse, Error, MatchRequest>({
    mutationFn: createMatch,
    onSuccess: (data) => {
      localStorage.setItem("gameId", data.GameId);
      console.log(data);
    },
    onError: (data) => {
      alert(data);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const listOfPlayers = [...Array(numPlayers)];
    setPlayersName(listOfPlayers);
    mutation.mutate({ gameType, X01TypeEnum, playersName });
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-white">
      <form
        className="flex flex-col items-center justify-center space-y-4 bg-gray-800 p-8 rounded-2xl shadow-2xl"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-2">X01 Game Mode Creator</h1>
        {/* Number input (custom + / - stepper) */}
        <div className="flex flex-col items-center">
          <p className="mb-2">How many players?</p>

          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => setNumPlayers((prev) => Math.max(1, prev - 1))}
              disabled={numPlayers <= 1}
              aria-label="Decrease players"
              className="bg-gray-600 px-4 py-2 rounded-md text-white text-xl hover:bg-gray-500 disabled:opacity-50 transition"
            >
              −
            </button>

            <span
              className="text-xl font-bold w-12 text-center"
              aria-live="polite"
              aria-atomic="true"
            >
              {numPlayers}
            </span>

            <button
              type="button"
              onClick={() => setNumPlayers((prev) => Math.min(8, prev + 1))}
              disabled={numPlayers >= 8}
              aria-label="Increase players"
              className="bg-gray-600 px-4 py-2 rounded-md text-white text-xl hover:bg-gray-500 disabled:opacity-50 transition"
            >
              +
            </button>
          </div>

          {/* Hidden input so the form still submits the value */}
          <input type="hidden" name="numOfPlayers" value={numPlayers} />
        </div>

        {/* Hidden input so the form still sends numOfPlayers */}
        <input type="hidden" name="numOfPlayers" value={numPlayers} />

        {/* player name inputs */}
        {numPlayers > 1 && (
          <div className="flex flex-col items-center space-y-2 p-2">
            <p className="text-lg font-semibold mt-2">Add Player Names</p>
            {[...Array(numPlayers)].map((_, index) => (
              <input
                key={index}
                type="text"
                name={`player_${index + 1}`}
                className="bg-gray-600 rounded-md px-3 py-2 w-48 text-center p-2"
                defaultValue={`Player ${index + 1}`}
              />
            ))}
          </div>
        )}

        <hr className="w-full border-gray-600" />

        {/* Radio buttons for in/out */}
        <div className="flex flex-col items-center">
          <p className="mb-2">Choose type of in/out</p>
          <div className="flex flex-col items-center space-y-2">
            <div className="flex space-x-4">
              <label>
                <input
                  type="radio"
                  name="gameOption"
                  id="doubleInOption"
                  value="DIDO"
                  onChange={(e) => setX01TypeEnum(e.target.value)}
                />
                <span className="ml-1">DI/DO</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="gameOption"
                  id="openInOption"
                  value="DISO"
                  onChange={(e) => setX01TypeEnum(e.target.value)}
                />
                <span className="ml-1">DI/SO</span>
              </label>
            </div>
            <div className="flex space-x-4">
              <label>
                <input
                  type="radio"
                  name="gameOption"
                  id="doubleOutOption"
                  value="SIDO"
                  onChange={(e) => setX01TypeEnum(e.target.value)}
                />
                <span className="ml-1">SI/DO</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="gameOption"
                  id="openOutOption"
                  value="SISO"
                  onChange={(e) => setX01TypeEnum(e.target.value)}
                />
                <span className="ml-1">SI/SO</span>
              </label>
            </div>
          </div>
        </div>

        <hr className="w-full border-gray-600" />

        {/* Double Bull toggle */}
        <div className="flex flex-col items-center">
          <p className="mb-2">Double Bull</p>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="doubleBullToggle"
              checked={doubleBull}
              onChange={(e) => setDoubleBull(e.target.checked)}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <hr className="w-full border-gray-600" />

        {/* Submit button */}
        {/* <Link to="/game">
          <button
            type="submit"
            className="rounded-xl shadow-xl bg-gray-900 w-60 h-16 text-white border-2 border-blue-400 hover:bg-blue-600 transition"
          >
            Start Match
          </button>
        </Link> */}
        <button
          type="submit"
          className="rounded-xl shadow-xl bg-gray-900 w-60 h-16 text-white border-2 border-blue-400 hover:bg-blue-600 transition"
        >
          Start Match
        </button>
      </form>
    </div>
  );
};

export default X01Config;
