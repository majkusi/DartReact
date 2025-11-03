import gameTypes from "../../gameTypes.json";
import GameType from "../components/GameView/GameType";
const CreateGamePage = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-gray-800 h-svh">
      {gameTypes.map((gameType) => (
        <GameType key={gameType.id} gameTypeName={gameType.name} />
      ))}
      ;
    </div>
  );
};

export default CreateGamePage;
