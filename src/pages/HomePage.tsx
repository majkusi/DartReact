import FeedComponent from "../components/FeedComponent";
import feedExample from "../../feedExample.json";
import LoginForm from "../components/LoginComponent";
import RegistryComponent from "../components/RegistryComponent";
const HomePage = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-gray-800">
      <RegistryComponent />
      <LoginForm />
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
