export default function ButtonAdmin({ onClick, className, children }) {
  return (
    <button className={`py-2 px-4 rounded-md ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
