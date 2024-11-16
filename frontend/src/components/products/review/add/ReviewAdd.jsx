import { useMutation } from "@tanstack/react-query";
import { addReview } from "../../../../request/review.js";
import { useParams } from "react-router-dom";
import Input from "../../../account/reusable/Input.jsx";
import { useEffect, useRef, useState } from "react";
import ReviewStarAdd from "./ReviewStarAdd.jsx";
import { isNotEmpty } from "../../../../validators/account.js";
import ErrorAlert from "../../../ui/ErrorAlert.jsx";

export default function ReviewAdd() {
  const params = useParams();
  const [enteredReview, setEnteredReview] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState({
    value: false,
    message: "",
  });
  const ref = useRef();

  const {
    mutateAsync,
    isSuccess,
    error: errorSend,
  } = useMutation({
    mutationFn: (review) => addReview(params.productId, review),
    onSuccess: () => {
      setIsEdit(false);
      setEnteredReview("");
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await mutateAsync({
      review: enteredReview,
      rating: ref.current.getRating(),
      isAccepted: false,
    });
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
  }, [enteredReview, isEdit]);

  return (
    <div className="flex flex-col items-center space-y-5">
      {errorSend?.response.data.errors?.map((err) => (
        <ErrorAlert key={err.msg} error={err.msg} />
      ))}
      <h1 className="text-3xl font-semibold">Add review</h1>
      {isSuccess && (
        <p className="text-xl text-green-500 font-semibold">
          Review added successfully
        </p>
      )}
      {errorSend?.response.status === 409 && (
        <p className="text-xl font-semibold text-red-500">
          You already add review to this product
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
