export default function CartDiv({ children }) {
  return (
    <div className="flex justify-center min-h-[calc(100vh-168px)] bg-[url('/cart.png')] bg-cover bg-center">
      <div className="flex flex-col bg-form my-10 p-5 rounded-md shadow-md w-1/2">
        {children}
      </div>
    </div>
  );
}
