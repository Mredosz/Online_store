export default function Button({ children, className, isValidate }) {
  let classes = `p-4 rounded-md uppercase font-semibold  ${className}`;
  if (isValidate) {
    classes += " hover:bg-green-600";
  }

  return (
    <button disabled={!isValidate} className={classes}>
      {children}
    </button>
  );
}
