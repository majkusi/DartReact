import { useState } from "react";
const X01Config = () => {
  const [doubleBull, setDoubleBull] = useState(false);
  function collectData(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // prevents page reload
    const formData = new FormData(event.currentTarget);

    const numOfPlayers = formData.get("numOfPlayers");
    const gameOpenOption = formData.get("gameOpenOption");
    const gameOutOption = formData.get("gameOutOption");
    const doubleBull = formData.get("doubleBullToggle") != null;

    console.log({
      numOfPlayers,
      gameOpenOption,
      gameOutOption,
      doubleBull,
    });
  }

  return (
    <div className="flex items-center justify-center min-h-screen text-white">
      <form
        className="flex flex-col items-center justify-center space-y-4 bg-gray-800 p-8 rounded-2xl shadow-2xl"
        onSubmit={collectData}
      >
        <h1 className="text-2xl font-bold mb-2">X01 Game Mode Creator</h1>

        {/* Number input */}
        <div className="flex flex-col items-center">
          <p className="mb-2">How many players?</p>
          <input
            type="number"
            defaultValue={1}
            min="1"
            max="8"
            className="bg-gray-500 border-2 border-white h-10 w-20 text-center rounded-md"
            name="numOfPlayers"
          />
        </div>

        <hr className="w-full border-gray-600" />

        {/* Radio buttons for in/out */}
        <div className="flex flex-col items-center">
          <p className="mb-2">Choose type of in/out</p>
          <div className="flex flex-col items-center space-y-2">
            <div className="flex space-x-4">
              <label>
                <input
                  type="radio"
                  name="gameOpenOption"
                  id="doubleInOption"
                  value="doubleIn"
                />
                <span className="ml-1">Double In</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="gameOpenOption"
                  id="openInOption"
                  value="openIn"
                />
                <span className="ml-1">Open In</span>
              </label>
            </div>
            <div className="flex space-x-4">
              <label>
                <input
                  type="radio"
                  name="gameOutOption"
                  id="doubleOutOption"
                  value="doubleOut"
                />
                <span className="ml-1">Double Out</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="gameOutOption"
                  id="openOutOption"
                  value="singleOut"
                />
                <span className="ml-1">Open Out</span>
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
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <hr className="w-full border-gray-600" />

        {/* Submit button */}
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
