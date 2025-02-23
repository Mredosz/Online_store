import { useQuery } from "@tanstack/react-query";
import { getAllReviewFromProduct } from "../../../request/review.js";
import { Text, TouchableOpacity, View } from "react-native";
import ReviewStar from "./ReviewStar";

type ReviewsAllProps = {
  onClick: () => void;
  id: string;
};

export default function ReviewsAll({ onClick, id }: ReviewsAllProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["review", id],
    queryFn: () => getAllReviewFromProduct(id),
  });

  return (
    <>
      {!isLoading && (
        <View className="relative flex mb-5">
          <Text className="text-3xl mb-4 mt-3 text-center text-darkText">
            Reviews
          </Text>
          <TouchableOpacity
            onPress={onClick}
            className="rounded-md py-2 px-4 bg-green-700 absolute right-6 top-4"
          >
            <Text className="text-darkText">Add review</Text>
          </TouchableOpacity>
          <View className="flex items-center px-2 divide-y gap-4 divide-gray-400">
            {data
              ?.filter((review) => review.isAccepted === true)
              .map((review) => (
                <View
                  key={review._id}
                  className="w-full px-4 py-2 bg-darkBgSoft rounded-md"
                >
                  <Text className="text-xl font-semibold text-darkText">
                    {review.userId.firstName}
                  </Text>
                  <View className="flex flex-row items-center gap-3">
                    <ReviewStar rating={review.rating} />
                    <Text className="text-lg text-darkText">
                      {new Date(review.date).toLocaleDateString("pl-PL")}
                    </Text>
                  </View>

                  <Text className="mt-3 text-lg text-darkText">
                    {review.review}
                  </Text>
                </View>
              ))}
          </View>
        </View>
      )}
    </>
  );
}
