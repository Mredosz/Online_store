import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllReviewFromProduct } from "../../../request/review.js";
import ReviewStar from "./ReviewStar.jsx";
import StateInfo from "../../ui/StateInfo.jsx";

export default function ReviewsAll({ onClick }) {
  const param = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["review", param.productId],
    queryFn: () => getAllReviewFromProduct(param.productId),
  });

  return (
    <>
      <StateInfo error={error?.message} isLoading={isLoading} />
      {!isLoading && (
        <div className="w-3/4 relative flex flex-col mb-5">
          <h1 className="text-3xl mb-4 mt-3 text-center">Reviews</h1>
          <button
            onClick={onClick}
            className="rounded-md py-2 px-4 bg-green-500 hover:bg-green-700 absolute right-16 top-6"
          >
            Add review
          </button>
          <ul className="flex flex-col items-center divide-y space-y-4 divide-gray-400">
            {data
              ?.filter((review) => review.isAccepted === true)
              .map((review) => (
                <li key={review._id} className="w-[90%] px-4 py-2">
                  <p className="text-xl font-semibold">
                    {review.userId.firstName}
                  </p>
                  <div className="flex items-center space-x-3">
                    <ReviewStar rating={review.rating} />
                    <p className="text-lg text-gray-600">
                      {new Date(review.date).toLocaleDateString("pl-PL")}
                    </p>
                  </div>

                  <p className="mt-3 text-lg text-gray-800">{review.review}</p>
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
}
