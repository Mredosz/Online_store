export default function Th({ children, className }) {
  const classes = `border-y border-gray-300 text-center ${className}`;

  return <th className={classes}>{children}</th>;
}
