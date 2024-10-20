import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllReviewFromProduct } from "../../../request/review.js";
import ReviewStar from "./ReviewStar.jsx";

export default function ReviewsAll() {
  const param = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["review", param.productId],
    queryFn: () => getAllReviewFromProduct(param.productId),
  });
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="w-3/4 flex flex-col mb-5">
      <h1 className="text-3xl mb-4 mt-3 text-center">Reviews</h1>
      <ul className="flex flex-col items-center divide-y space-y-4 divide-gray-400">
        {data
          .filter((review) => review.isAccepted === true)
          .map((review) => (
            <li key={review._id} className="w-[90%] px-4 py-2">
              <p className="text-xl font-semibold">{review.userId.firstName}</p>
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
  );
}
