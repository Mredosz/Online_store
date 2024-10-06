export default function Button({ children, className }) {
  const classes = `text-white font-bold py-2 px-4 rounded ${className}`;
  return <button className={classes}>{children}</button>;
}
