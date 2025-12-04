import feedExample from "../../feedExample.json";
import FeedComponent from "../components/FeedComponent";

const HomePage = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-black">
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
