import NavBar from "../components/NavBar";
import { Outlet } from "react-router";
const MainLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default MainLayout;
