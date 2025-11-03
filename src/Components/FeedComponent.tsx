interface PropsTypes {
  feedTitle: string;
  feedContent: string;
  feedAuthor: string;
  feedDate: string;
}

const Feed = ({ feedTitle, feedContent, feedAuthor, feedDate }: PropsTypes) => {
  return (
    <div className="rounded-xl shadow-xl bg-gray-900 w-xl ml-auto mr-auto border-blue-400 border-3 text-white m-2">
      <h1>{feedTitle}</h1>
      <br />
      <p>{feedContent}</p>
      <p>{feedAuthor}</p>
      <p>{feedDate}</p>
    </div>
  );
};

export default Feed;
