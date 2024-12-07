export default function AddButton({ children, ...props }) {
  return (
    <button
      className="flex justify-center items-center bg-green-500 p-2 rounded-md ml-3 my-3 hover:bg-green-700"
      {...props}
    >
      {children}
    </button>
  );
}
