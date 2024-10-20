import { FaStar, FaRegStar } from "react-icons/fa";

export default function ({ rating, list }) {
  let ratingAll;
  if (list) {
    const acceptedList = list.filter((review) => review.isAccepted === true);
    ratingAll =
      acceptedList.reduce((acc, review) => acc + review.rating, 0) /
      acceptedList.length;
  }
  const ratingFloor = Math.floor(ratingAll) || Math.floor(rating);

  console.log(ratingFloor);

  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, index) =>
        index < ratingFloor ? (
          <FaStar key={index} />
        ) : (
          <FaRegStar key={index} />
        ),
      )}
    </div>
  );
}
