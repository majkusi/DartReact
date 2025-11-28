import { useState } from "react";
import PlayerCard from "../Components/GameView/PlayerCard";
import ScoreBoard from "../Components/GameView/ScoreBoard";

const GameViewPage = () => {
  const [selectedPlayerUsername, setSelectedPlayerUsername] = useState<string | undefined>(undefined);

  return (
    <div className="flex flex-col justify-center items-center bg-gray-800 h-svh">
      <PlayerCard
        selectedPlayerUsername={selectedPlayerUsername}
        onSelectPlayer={setSelectedPlayerUsername}
      />
      <ScoreBoard
        selectedPlayerUsername={selectedPlayerUsername}
        onSelectPlayer={setSelectedPlayerUsername}
      />
    </div>
  );
};

export default GameViewPage;
