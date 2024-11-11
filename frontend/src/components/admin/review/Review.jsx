import ButtonAdmin from "../reusable/Buttons/ButtonAdmin.jsx";
import { useState } from "react";

export default function Review({ review, onClick, onDelete }) {
  const [isAccepted, setIsAccepted] = useState(review.isAccepted);

  const handleClick = async () => {
    const newIsAccepted = !isAccepted;
    setIsAccepted(newIsAccepted);
    await onClick(review._id, newIsAccepted);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 w-full sm:w-3/4 py-2 border-b border-gray-300 hover:bg-gray-100 text-center items-center">
      <span>{review.productId?.name}</span>
      <span>{review.userId?.email}</span>
      <span>{review.rating}</span>
      <span>{review.review}</span>
      <span>{isAccepted ? "Yes" : "No"}</span>
      <div className="flex space-x-2 justify-center">
        <ButtonAdmin
          className={
            isAccepted
              ? "bg-fuchsia-500 hover:bg-fuchsia-600"
              : "bg-green-500 hover:bg-green-600"
          }
          onClick={handleClick}
        >
          {isAccepted ? "Decline" : "Accept"}
        </ButtonAdmin>
        <ButtonAdmin
          className="bg-red-500 hover:bg-red-600"
          onClick={() => onDelete(review._id)}
        >
          Delete
        </ButtonAdmin>
      </div>
    </div>
  );
}
