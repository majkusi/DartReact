import { Link } from "react-router";

interface PropsTypes {
  gameTypeName: string;
}

const GameType = ({ gameTypeName }: PropsTypes) => {
  return (
    <div>
      <Link to="/createGame/X01">
        <button className="rounded-xl shadow-xl ml-auto mr-auto bg-gray-900 w-60 h-24 m-2 text-white border-2 border-blue-400">
          {gameTypeName}
        </button>
      </Link>
    </div>
  );
};

export default GameType;
