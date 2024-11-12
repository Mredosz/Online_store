import { CgSpinner } from "react-icons/cg";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center">
      <CgSpinner size={150} className="animate-spin duration-500" />
    </div>
  );
}
