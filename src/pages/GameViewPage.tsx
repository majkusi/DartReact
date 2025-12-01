import { useState } from "react";
import Popup from "../components/GameView/Popup";
import PlayerCard from "../components/GameView/PlayerCard";
import ScoreBoard from "../components/GameView/ScoreBoard";

const GameViewPage = () => {
  const [selectedPlayerUsername, setSelectedPlayerUsername] = useState<
    string | undefined
  >(undefined);
  const [showPopup, setShowPopup] = useState(false);
  const [winnerUsername, setWinnerUsername] = useState<string | null>(null);

  const handleGameStateUpdate = (finished: boolean, winner: string) => {
    if (finished) {
      setWinnerUsername(winner);
      setShowPopup(true);
    }
  };

  return (
    <>
      <Popup
        isOpen={showPopup}
        message={`Game Over! Winner: ${winnerUsername}`}
        onClose={() => setShowPopup(false)}
      />
      <div className="flex flex-col justify-center items-center bg-gray-800 h-svh">
        <PlayerCard
          selectedPlayerUsername={selectedPlayerUsername}
          onSelectPlayer={setSelectedPlayerUsername}
          onGameFinished={handleGameStateUpdate}
        />
        <ScoreBoard
          selectedPlayerUsername={selectedPlayerUsername}
          onSelectPlayer={setSelectedPlayerUsername}
        />
      </div>
    </>
  );
};

export default GameViewPage;
