const X01Config = () => {
  function collectData(formData: FormData) {
    const numOfPlayers = formData.get("numOfPlayers");
    alert({ numOfPlayers });
  }

  return (
    <form className="text-white ml-auto mr-auto" action={collectData}>
      <h1>X01 Game Mode Creator</h1>
      <p>How many players ? </p>
      <input
        type="number"
        defaultValue={1}
        min="1"
        max="8"
        className="bg-gray-500 border-2 border-white h-10 w-20"
        name="numOfPlayers"
      />
      <hr />
      <p>Choose type of in/out</p>
      <div>
        <label className="m-2">
          <input type="radio" name="gameOpenOption" id="doubleInOption" />
          Double In
        </label>
        <label className="m-2">
          <input type="radio" name="gameOpenOption" id="openInOption" />
          Open In
        </label>
      </div>
      <div>
        <label className="m-2">
          <input type="radio" name="gameOutOption" id="doubleOutOption" />
          Double Out
        </label>
        <label className="m-2">
          <input type="radio" name="gameOutOption" id="openOutOption" />
          Open Out
        </label>
      </div>
      <hr />

      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          value="doubleBoolToggle"
          className="sr-only peer"
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          Double Bull
        </span>
      </label>
      <hr />
      <button>Submit</button>
    </form>
  );
};

export default X01Config;
