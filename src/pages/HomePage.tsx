import feedExample from "../../feedExample.json";
import FeedComponent from "../Components/FeedComponent";

const HomePage = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-gray-800">
      {feedExample.map((feed) => (
        <FeedComponent
          key={feed.id}
          feedTitle={feed.feedTitle}
          feedAuthor={feed.feedAuthor}
          feedContent={feed.feedContent}
          feedDate={feed.feedDate}
        />
      ))}
    </div>
  );
};

export default HomePage;
