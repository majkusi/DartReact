import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="bg-black border-b border-cyan-600 shadow-[0_0_20px_cyan]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-white hover:scale-105 transition-transform duration-200"
          >
            <span className="text-2xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-green-400">
              🎯 Darts Hub
            </span>
          </Link>

          {/* Nav Links */}
          <div className="flex space-x-2 md:space-x-4">
            {[
              { to: "/", label: "Home" },
              { to: "/createGame", label: "Play" },
              { to: "/about", label: "About" },
              { to: "/login", label: "Sign up" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="relative px-4 py-2 font-medium rounded-lg text-white border-2 border-cyan-600 transition-all duration-200
                           before:absolute before:inset-0 before:bg-gradient-to-r before:from-cyan-500 before:to-green-400 before:rounded-lg before:opacity-0
                           hover:before:opacity-20 hover:scale-105 z-10"
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
