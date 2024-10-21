import { useMutation } from "@tanstack/react-query";
import { addReview } from "../../../../request/review.js";
import { useParams } from "react-router-dom";
import Input from "../../../account/reusable/Input.jsx";
import { useEffect, useRef, useState } from "react";
import ReviewStarAdd from "./ReviewStarAdd.jsx";
import { isNotEmpty } from "../../../../validators/account.js";

export default function ReviewAdd() {
  const params = useParams();
  const [enteredReview, setEnteredReview] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState({
    value: false,
    message: "",
  });
  const ref = useRef();

  const { mutateAsync, isSuccess } = useMutation({
    mutationFn: (review) => addReview(params.productId, review),
    onSuccess: () => {
      setIsEdit(false);
      setEnteredReview("");
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!localStorage.getItem("is_logged_in")) {
        return window.alert("You must log in");
      }
      await mutateAsync({
        review: enteredReview,
        rating: ref.current.getRating(),
        isAccepted: false,
      });
    } catch (e) {
      //Todo zrobić wyświetlanie error
      console.log(e.response.data.errors);
    }
  };

  const handleInputChange = (event) => {
    setEnteredReview(event.target.value);
  };

  const handleInputBlur = () => {
    setIsEdit(true);
  };

  useEffect(() => {
    if (isEdit && !isNotEmpty(enteredReview)) {
      setError({
        value: true,
        message: "Review can't be empty",
      });
    } else if (isEdit && enteredReview.length < 3) {
      setError({
        value: true,
        message: "Review must be min 3 char long.",
      });
    } else {
      setError({
        value: false,
        message: "",
      });
    }
  }, [error]);

  return (
    <div className="flex flex-col items-center space-y-5">
      <h1 className="text-3xl font-semibold">Add review</h1>
      {isSuccess && (
        <p className="text-xl text-green-500 font-semibold">
          Review added successfully
        </p>
      )}
      <form
        className="w-3/4 flex flex-col items-center space-y-4"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col w-full">
          <span className="uppercase font-semibold mb-1 text-gray-500">
            Rating
          </span>
          <ReviewStarAdd ref={ref} />
        </div>
        <Input
          id="review"
          label="review"
          textarea
          className="w-full"
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          error={error}
        />
        <button className="py-2 px-4 bg-green-500 hover:bg-green-700 rounded-md w-full">
          Add review
        </button>
      </form>
    </div>
  );
}
