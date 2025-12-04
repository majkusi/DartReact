interface PropsTypes {
  feedTitle: string;
  feedContent: string;
  feedAuthor: string;
  feedDate: string;
}

const Feed = ({ feedTitle, feedContent, feedAuthor, feedDate }: PropsTypes) => {
  return (
    <div className="max-w-xl mx-auto my-4 p-6 rounded-3xl bg-black border-2 border-cyan-500 shadow-[0_0_15px_cyan,0_0_30px_blue] transition-transform duration-300 hover:scale-105">
      {/* Title */}
      <h2 className="text-2xl font-extrabold text-white mb-4 tracking-wide">
        {feedTitle}
      </h2>

      {/* Content */}
      <p className="text-white text-base mb-4 leading-relaxed">{feedContent}</p>

      {/* Author and Date */}
      <div className="flex justify-between text-sm text-gray-300 mt-4 border-t border-cyan-600 pt-2">
        <span className="font-medium text-white">{feedAuthor}</span>
        <span className="text-white">{feedDate}</span>
      </div>
    </div>
  );
};

export default Feed;
