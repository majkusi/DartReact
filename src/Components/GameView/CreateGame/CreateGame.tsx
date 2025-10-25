import { useState } from "react";

function CreateGame() {
  const [selectedGameType, setSelectedGameType] = useState("");
  const handleGameTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedGameType(event.target.value);
  };

  return (
    <form className="custom-create-game justify-content-center align-items-center d-flex flex-column ">
      <div className="p-2 mb-3 w-25">
        <label className="form-label ">Choose game type:</label>
        <select
          id="gameTypeSelect"
          className="form-select"
          value={selectedGameType}
          onChange={handleGameTypeChange}
        >
          <option>Cricket 200</option>
          <option>501</option>
          <option>Clock</option>
        </select>
        {selectedGameType === "501" && (
          <>
            <label className="form-label ">Choose 501 mode:</label>
            <select id="select501Mode" className="form-select">
              <option id="dido">Double In / Double Out</option>
              <option id="diso">Double In / Single Out</option>
              <option id="sido">Single In / Double Out</option>
              <option id="siso">Single In / Single Out</option>
            </select>
          </>
        )}
      </div>
      <div className="p-2 mb-3 w-25">
        <label className="form-label">Choose number of players:</label>
        <select id="numOfPlayersSelect" className="form-select">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default CreateGame;
