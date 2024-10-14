import Button from "./Button.jsx";
import { Link } from "react-router-dom";

export default function FormDiv({
  children,
  isSuccess,
  error,
  handleSubmit,
  buttonText,
  topText,
  isValidate = true,
  type,
  accountText,
}) {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-168px)] bg-[url('/register.png')] bg-cover bg-center">
      <form
        className="flex flex-col bg-form p-4 rounded-md shadow-md w-[29rem] border-2 border-formBorder"
        onSubmit={handleSubmit}
      >
        <h1 className="flex justify-center text-3xl text-gray-500 mb-4 uppercase font-semibold">
          {topText}
        </h1>
        {isSuccess && (
          <p className="text-center text-xl text-gray-600">Account created!</p>
        )}
        {error && error.status === 404 && (
          <p className="text-center text-xl text-red-600">
            You put wrong credentials
          </p>
        )}
        {error && error.status === 409 && (
          <p className="text-center text-xl text-red-600">
            This user doesn't exist.
          </p>
        )}
        {children}
        <Link to={type} className="mt-2">
          {accountText}
        </Link>
        <Button className="bg-green-400 mt-8" isValidate={isValidate}>
          {buttonText}
        </Button>
      </form>
    </div>
  );
}
