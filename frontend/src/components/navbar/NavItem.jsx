import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function NavItem({ children, path, ...props }) {
  return (
    <li>
      <NavLink to={path} {...props}>
        {children}
      </NavLink>
    </li>
  );
}
