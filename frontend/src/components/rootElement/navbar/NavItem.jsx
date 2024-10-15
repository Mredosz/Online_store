import { NavLink } from "react-router-dom";

export default function NavItem({ children, path, count, ...props }) {
  return (
    <li>
      <NavLink
        to={path}
        className={({ isActive }) => (isActive ? "text-white" : undefined)}
        {...props}
      >
        {children}
        <span className="text-white absolute top-0 right-0">{count}</span>
      </NavLink>
    </li>
  );
}
