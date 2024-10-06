import Navbar from "./Navbar.jsx";
import { Outlet } from "react-router-dom";

export default function RootElement() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
