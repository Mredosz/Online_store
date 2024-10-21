export default function AddButton({ children, isTooMuch, ...props }) {
  let classes =
    "flex justify-center items-center bg-green-500 p-2 rounded-md ml-3 my-3";

  if (!isTooMuch) {
    classes += " hover:bg-green-700";
  }

  return (
    <button disabled={isTooMuch} className={classes} {...props}>
      {children}
    </button>
  );
}
