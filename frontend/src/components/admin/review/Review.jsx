import Td from "../reusable/table/Td.jsx";
import ButtonAdmin from "../reusable/ButtonAdmin.jsx";
import { useState } from "react";

export default function Review({ review, onClick }) {
  const [isAccepted, setIsAccepted] = useState(review.isAccepted);

  const handleClick = async () => {
    const newIsAccepted = !isAccepted;
    setIsAccepted(newIsAccepted);
    await onClick(review._id, newIsAccepted);
  };

  return (
    <tr className="hover:bg-gray-100">
      <Td>{review.productId}</Td>
      <Td>{review.userId}</Td>
      <Td>{review.rating}</Td>
      <Td>{review.review}</Td>
      <Td>{review.isAccepted ? "Yes" : "No"}</Td>
      <Td>
        <ButtonAdmin
          className={
            isAccepted
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          }
          onClick={handleClick}
        >
          {isAccepted ? "Decline" : "Accept"}
        </ButtonAdmin>
      </Td>
    </tr>
  );
}
