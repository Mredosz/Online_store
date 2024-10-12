import Navbar from "./navbar/Navbar.jsx";
import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer.jsx";

export default function RootElement() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
