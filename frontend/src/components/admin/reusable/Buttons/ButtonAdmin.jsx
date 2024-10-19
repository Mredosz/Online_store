export default function ButtonAdmin({ onClick, className, children }) {
  const classes = `py-2 px-4 rounded-md ${className}`;
  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
