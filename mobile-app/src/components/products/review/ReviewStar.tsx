import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { colors } from "../../../utils/colors";

export default function ReviewStar({ rating, list }) {
  let ratingAll;
  if (list) {
    const acceptedList = list.filter((review) => review.isAccepted === true);
    ratingAll =
      acceptedList.reduce((acc, review) => acc + review.rating, 0) /
      acceptedList.length;
  }
  const ratingFloor = Math.floor(ratingAll) || Math.floor(rating);

  return (
    <View className="flex flex-row">
      {Array.from({ length: 5 }).map((_, index) => (
        <Icon
          name="star"
          solid={index < ratingFloor}
          color={colors.darkText}
          key={index}
        />
      ))}
    </View>
  );
}
