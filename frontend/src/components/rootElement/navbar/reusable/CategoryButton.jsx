export default function CategoryButton({ onClick, children }) {
  return (
    <button onClick={onClick} className="hover:opacity-20">
      {children}
    </button>
  );
}
