import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  acceptReview,
  deleteReview,
  getAllReview,
} from "../../../request/review.js";
import Review from "./Review.jsx";
import StateInfo from "../../ui/StateInfo.jsx";

export default function AllReview() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["review"],
    queryFn: getAllReview,
  });

  const { mutateAsync } = useMutation({
    mutationFn: ({ id, isAccepted }) => acceptReview(id, isAccepted),
  });

  const handleAcceptReview = async (id, isAccepted) => {
    await mutateAsync({ id, isAccepted });
    await queryClient.invalidateQueries(["review"]);
  };

  const handleDelete = async (id) => {
    await deleteReview(id);
    await queryClient.invalidateQueries("review");
  };

  return (
    <>
      <StateInfo error={error?.message} isLoading={isLoading} />
      {!isLoading && (
        <div className="grid justify-items-center w-full my-5">
          <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 border-b border-gray-300 w-full sm:w-3/4 py-2 font-semibold text-center">
            <span>Product</span>
            <span>User</span>
            <span>Rating</span>
            <span>Review</span>
            <span>Is accepted</span>
            <span>Actions</span>
          </div>
          {data?.map((review) => (
            <Review
              review={review}
              onClick={handleAcceptReview}
              key={review._id}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </>
  );
}
