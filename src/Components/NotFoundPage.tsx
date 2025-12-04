import { Link } from "react-router";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <section className="flex flex-col justify-center items-center h-screen bg-black">
      <FaExclamationTriangle className="text-yellow-400 text-8xl mb-6 animate-pulse" />

      <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-wider">
        Page Not Found
      </h1>

      <p className="text-white text-lg md:text-xl mb-6">
        Sorry, the page you are looking for does not exist.
      </p>

      <Link
        to="/"
        className="px-6 py-3 rounded-full bg-black text-white font-semibold text-lg border-2 border-cyan-500
                   shadow-[0_0_15px_cyan,0_0_30px_skyblue] transition-transform duration-300 
                   hover:scale-105 hover:shadow-[0_0_25px_cyan,0_0_50px_skyblue]"
      >
        Go Back Home
      </Link>
    </section>
  );
};

export default NotFoundPage;
