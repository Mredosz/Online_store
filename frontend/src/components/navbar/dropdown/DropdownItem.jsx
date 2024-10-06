import { Link } from "react-router-dom";

export default function DropdownItem({
  path,
  handleClick,
  open,
  children,
  ...props
}) {
  return (
    <Link to={path} onClick={handleClick} {...props}>
      {open && children}
    </Link>
  );
}
