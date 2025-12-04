import { useState } from "react";
import Popup from "../components/GameView/Popup";
import PlayerCard from "../components/GameView/PlayerCard";
import ScoreBoard from "../components/GameView/ScoreBoard";

const GameViewPage = () => {
  const [selectedPlayerUsername, setSelectedPlayerUsername] =
    useState<string>();
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
        redirectTo="/"
      />
      <div className="flex flex-col justify-center items-center bg-black min-h-screen p-6 gap-8">
        <PlayerCard
          selectedPlayerUsername={selectedPlayerUsername}
          onSelectPlayer={setSelectedPlayerUsername}
          onGameFinished={handleGameStateUpdate}
        />
        <ScoreBoard selectedPlayerUsername={selectedPlayerUsername} />
      </div>
    </>
  );
};

export default GameViewPage;
