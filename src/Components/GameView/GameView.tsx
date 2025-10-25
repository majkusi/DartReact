import ScoreBoard from "./ScoreBoard/ScoreBoard";
import PlayerCard from "./PlayerCard/PlayerCard";
function GameView() {
  return (
    <>
      <PlayerCard />
      <ScoreBoard />;
    </>
  );
}
export default GameView;
