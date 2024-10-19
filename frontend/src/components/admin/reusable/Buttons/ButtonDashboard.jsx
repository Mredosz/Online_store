import { Link } from "react-router-dom";

export default function ButtonDashboard({ to, children }) {
  return (
    <Link
      to={to}
      className="py-2 px-4 rounded-md text-3xl bg-gradient-to-r from-navbar to-darkerNavbar hover:from-darkerNavbar hover:to-navbar"
    >
      {children}
    </Link>
  );
}
