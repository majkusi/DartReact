interface PropsTypes {
  playerName: string;
  playerId: number;
  playerScore: number;
  isPlayerTurn: boolean;
}

function PlayerTurn({ isPlayerTurn }: Pick<PropsTypes, "isPlayerTurn">) {
  return (
    <span
      className={`ml-2 text-lg ${
        isPlayerTurn ? "text-green-400" : "text-red-500"
      }`}
    >
      {isPlayerTurn ? "🟢" : "🔴"}
    </span>
  );
}

const PlayerCard = ({
  playerName,
  playerId,
  playerScore,
  isPlayerTurn,
}: PropsTypes) => {
  return (
    <div
      key={playerId}
      className={`flex flex-col justify-between items-center text-center rounded-2xl p-4 m-3 w-48 transition-all duration-300
      ${
        isPlayerTurn
          ? "bg-gradient-to-b from-blue-800 to-blue-600 border-blue-400 shadow-blue-500/40 scale-105"
          : "bg-gray-800 border-gray-600"
      }
      border-2 shadow-lg`}
    >
      {/* Player Name */}
      <h1 className="text-lg font-bold tracking-wide flex items-center justify-center">
        {playerName}
        <PlayerTurn isPlayerTurn={isPlayerTurn} />
      </h1>

      {/* Player Score */}
      <h2
        className={`text-3xl font-extrabold mt-3 ${
          isPlayerTurn ? "text-white" : "text-gray-300"
        }`}
      >
        {playerScore}
      </h2>
    </div>
  );
};

export default PlayerCard;
