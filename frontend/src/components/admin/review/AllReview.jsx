import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { acceptReview, getAllReview } from "../../../request/review.js";
import Th from "../reusable/table/Th.jsx";
import Review from "./Review.jsx";

export default function AllReview() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["review"],
    queryFn: getAllReview,
  });

  const { mutateAsync } = useMutation({
    mutationFn: ({ id, isAccepted }) => acceptReview(id, isAccepted),
  });

  if (isLoading) {
    return <div>Is loading ...</div>;
  }

  const handleAcceptReview = async (id, isAccepted) => {
    await mutateAsync({ id, isAccepted });
    queryClient.invalidateQueries(["review"]);
  };

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
            <Review
              review={review}
              onClick={handleAcceptReview}
              key={review._id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
