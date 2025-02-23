import { forwardRef, useImperativeHandle, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { colors } from "../../../../utils/colors";

const ReviewStarAdd = forwardRef(function ReviewStarAdd(props, ref) {
  const [hover, setHover] = useState(null);
  const [rating, setRating] = useState(null);

  useImperativeHandle(ref, () => ({
    getRating: () => rating + 1,
  }));

  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          onMouseEnter={() => setHover(index)}
          onMouseLeave={() => setHover(null)}
          onClick={() => setRating(index)}
          className="cursor-pointer"
        >
          <Icon
            name="star"
            solid={index <= (hover !== null ? hover : rating)}
            color={colors.darkText}
            key={index}
          />
        </span>
      ))}
    </div>
  );
});

export default ReviewStarAdd;
