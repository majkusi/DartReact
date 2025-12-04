import { Link } from "react-router";

interface PropsTypes {
  gameTypeName: string;
}

const GameType = ({ gameTypeName }: PropsTypes) => {
  return (
    <div className="flex justify-center">
      <Link to="/createGame/X01">
        <button
          className="w-60 h-24 m-2 rounded-full bg-black text-white font-semibold text-lg uppercase tracking-wider 
                           border-2 border-cyan-500 shadow-[0_0_12px_cyan,0_0_24px_skyblue] 
                           transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_20px_cyan,0_0_40px_skyblue]"
        >
          {gameTypeName}
        </button>
      </Link>
    </div>
  );
};

export default GameType;
