import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import NotFoundPage from "./components/NotFoundPage";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import CreateGamePage from "./pages/CreateGamePage";
import CreateX01GamePage from "./pages/CreateX01GamePage";
import GameViewPage from "./pages/GameViewPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

/// rafce
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/createGame" element={<CreateGamePage />} />
      <Route path="/createGame/X01" element={<CreateX01GamePage />} />
      <Route path="/game" element={<GameViewPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
