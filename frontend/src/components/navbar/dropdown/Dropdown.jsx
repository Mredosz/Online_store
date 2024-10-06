import { useState } from "react";

export default function Dropdown({
  children,
  title,
  handleClick,
  open,
  ...props
}) {
  return (
    <li>
      <button onClick={handleClick}>{title}</button>
      {open && <div {...props}>{children}</div>}
    </li>
  );
}
