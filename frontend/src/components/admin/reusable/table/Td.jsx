export default function Td({ children, className }) {
  const classes = `border-y border-gray-300 text-center ${className}`;
  return <td className={classes}>{children}</td>;
}
