export default function Button({ children, className, ...props }) {
  const classes = `font-bold p-2 rounded-md ${className}`;
  return (
    <button {...props} className={classes}>
      {children}
    </button>
  );
}
