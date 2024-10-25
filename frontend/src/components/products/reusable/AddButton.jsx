export default function AddButton({ children, ...props }) {
  let classes =
    "flex justify-center items-center bg-green-500 p-2 rounded-md ml-3 my-3 hover:bg-green-700";

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
