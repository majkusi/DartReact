import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="bg-linear-to-r from-gray-800 via-gray-900 to-gray-800 border-b border-blue-500 shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-white hover:scale-105 transition-transform duration-200"
          >
            <span className="text-2xl font-extrabold tracking-wide">
              🎯 <span className="text-blue-400">Darts</span> Hub
            </span>
          </Link>

          {/* Nav Links */}
          <div className="flex space-x-2 md:space-x-4">
            {[
              { to: "/", label: "Home" },
              { to: "/createGame", label: "Play" },
              { to: "/about", label: "About" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="no-underline text-white bg-gray-700 hover:bg-blue-600 px-4 py-2 rounded-lg font-medium transition-all duration-200 border border-blue-400/40 hover:border-blue-400"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
