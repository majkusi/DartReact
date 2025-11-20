import PlayerCard from "../components/GameView/PlayerCard";
import ScoreBoard from "../components/GameView/ScoreBoard";
const GameViewPage = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-gray-800 h-svh">
      <PlayerCard />
      <ScoreBoard />
    </div>
  );
};

export default GameViewPage;
