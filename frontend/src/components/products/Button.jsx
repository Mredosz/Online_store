export default function Button({ children, className }) {
  const classes = `font-bold p-2 rounded-md ${className}`;
  return <button className={classes}>{children}</button>;
}
