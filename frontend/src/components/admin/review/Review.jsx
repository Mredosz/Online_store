import Td from "../reusable/table/Td.jsx";
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
    <tr className="hover:bg-gray-100">
      <Td>{review.productId?.name}</Td>
      <Td>{review.userId?.email}</Td>
      <Td>{review.rating}</Td>
      <Td>{review.review}</Td>
      <Td>{isAccepted ? "Yes" : "No"}</Td>
      <Td>
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
      </Td>
      <Td>
        <ButtonAdmin
          className="bg-red-500 hover:bg-red-600"
          onClick={() => onDelete(review._id)}
        >
          Delete
        </ButtonAdmin>
      </Td>
    </tr>
  );
}
