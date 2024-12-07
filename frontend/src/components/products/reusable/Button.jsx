export default function Button({ children, className, ...props }) {
  return (
    <button {...props} className={`font-bold p-2 rounded-md ${className}`}>
      {children}
    </button>
  );
}
