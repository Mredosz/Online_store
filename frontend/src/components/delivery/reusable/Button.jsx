export default function Button({ children, className, isValid, ...props }) {
  const classes = `py-2 px-4 mt-4 rounded-md bg-green-500 ${isValid && "hover:bg-green-700"} ${className}`;

  return (
    <button {...props} className={classes}>
      {children}
    </button>
  );
}
