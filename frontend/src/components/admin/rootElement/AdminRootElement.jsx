import { Outlet } from "react-router-dom";
import AdminNavbar from "./navbar/AdminNavbar.jsx";

export default function AdminRootElement() {
  return (
    <div className="flex flex-col min-h-screen">
      <AdminNavbar />
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
}
