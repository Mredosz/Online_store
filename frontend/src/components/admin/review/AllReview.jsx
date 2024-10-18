import { useQuery } from "@tanstack/react-query";
import { getAllReview } from "../../../request/review.js";
import Th from "../reusable/table/Th.jsx";
import Td from "../reusable/table/Td.jsx";

export default function AllReview() {
  const { data, isLoading } = useQuery({
    queryKey: "review",
    queryFn: getAllReview,
  });

  if (isLoading) {
    return <div>Is loading ...</div>;
  }

  return (
    <div className="flex justify-center items-center w-full my-5">
      <table className="table-auto border-collapse border-gray-300 w-1/2">
        <thead>
          <tr>
            <Th>Product</Th>
            <Th>User</Th>
            <Th>Rating</Th>
            <Th>Review</Th>
            <Th>Is accepted</Th>
            <Th></Th>
          </tr>
        </thead>
        <tbody>
          {data.map((review) => (
            <tr key={review._id} className="hover:bg-gray-100">
              <Td>{review.productId}</Td>
              <Td>{review.userId}</Td>
              <Td>{review.rating}</Td>
              <Td>{review.review}</Td>
              <Td>{review.isAccepted}</Td>
              <Td>
                <button>Edit</button>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
