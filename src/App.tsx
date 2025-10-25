import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import { Routes, Route } from "react-router-dom";
import GameView from "./Components/GameView/GameView";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/play" element={<GameView />} />
      </Routes>
    </>
  );
}

export default App;
