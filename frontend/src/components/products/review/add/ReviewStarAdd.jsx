import { forwardRef, useImperativeHandle, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

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
          {index <= (hover !== null ? hover : rating) ? (
            <FaStar size={25} />
          ) : (
            <FaRegStar size={25} />
          )}
        </span>
      ))}
    </div>
  );
});

export default ReviewStarAdd;
