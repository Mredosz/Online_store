import ErrorAlert from "../ui/ErrorAlert.jsx";

export default function CartDiv({ children, alert }) {
  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-168px)] bg-[url('/cart.png')] bg-cover bg-center">
      <div className="mt-10">
        {alert?.map((err) => (
          <ErrorAlert key={err.msg} error={err.msg} />
        ))}
      </div>
      <div className="flex flex-col bg-form mb-10 p-5 rounded-md shadow-md w-1/2">
        {children}
      </div>
    </div>
  );
}
