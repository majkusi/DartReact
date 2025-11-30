import { useState } from "react";
import PlayerCard from "../components/GameView/PlayerCard";
import ScoreBoard from "../components/GameView/ScoreBoard";

const GameViewPage = () => {
  const [selectedPlayerUsername, setSelectedPlayerUsername] = useState<
    string | undefined
  >(undefined);

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
