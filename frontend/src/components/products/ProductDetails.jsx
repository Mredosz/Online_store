import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductDetails } from "../../request/products.js";
import { FaCalendarAlt, FaCartPlus, FaClock, FaTruck } from "react-icons/fa";
import DetailsSections from "./reusable/DetailsSections.jsx";
import { useReducer, useState } from "react";
import AddButton from "./reusable/AddButton.jsx";
import SpecificationElement from "./reusable/SpecificationElement.jsx";
import ProductModal from "./modal/ProductModal.jsx";

function reducer(state, action) {
  switch (action.type) {
    case "DELIVER":
      return { content: "delivery" };
    case "WARRANTY":
      return { content: "warranty" };
    case "BUY_NOW":
      return { content: "buy_now" };
    default:
      return state;
  }
}

export default function ProductDetails() {
  const params = useParams();
  const [isTooMuch, setIsTooMuch] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, { content: "" });

  const { data, isLoading } = useQuery({
    queryKey: ["products", params.productId],
    queryFn: () => getProductDetails(params.productId),
  });

  const changeHandler = (event) => {
    if (event.target.value > data.availableQuantity) {
      setIsTooMuch(true);
    } else {
      setIsTooMuch(false);
    }
  };

  const handleOpenModal = (type) => {
    dispatch({ type });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center h-full">
      <div className="flex mt-7 h-full w-full justify-center">
        <div className="flex mr-20 justify-end items-end">
          <img src={data.image} alt={data.name} className="h-[26rem]" />
        </div>
        <div>
          <div className="flex flex-col pt-3 pl-3">
            <h1 className="text-3xl">{data.name}</h1>
            <p>******</p>
          </div>
          <div className="flex space-x-5">
            <div className="rounded-md border border-gray-300 shadow-md p-4 w-64">
              Specyfikacja
            </div>
            <div className="flex flex-col rounded-md border border-gray-300 shadow-md h-[23rem] w-64">
              <div className="border-b border-gray-300 w-full pt-4">
                <p className="flex justify-end text-3xl mr-4">
                  {data.price} zł
                </p>
                <div className="flex mt-3 justify-center">
                  <input
                    type={"number"}
                    className="rounded-md h-10 w-20 mt-3 text-xl border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-500"
                    defaultValue={1}
                    min={1}
                    max={data.availableQuantity}
                    onChange={changeHandler}
                  />
                  <AddButton isTooMuch={isTooMuch}>
                    <FaCartPlus className="text-white" />
                    <p className="ml-2 text-white">Add to cart</p>
                  </AddButton>
                </div>
              </div>
              <div>
                <DetailsSections
                  component="div"
                  firstText="Available"
                  secondText={data.availableQuantity}
                />
                <DetailsSections
                  component="button"
                  firstText="Buy now, get on Tuesday"
                  secondText="Click for more information"
                  onClick={() => handleOpenModal("BUY_NOW")}
                >
                  <FaClock size={26} className="mr-3 flex justify-center" />
                </DetailsSections>
                <DetailsSections
                  component="button"
                  firstText="Free Deliver"
                  secondText="Click for more information"
                  onClick={() => handleOpenModal("DELIVER")}
                >
                  <FaTruck size={26} className="mr-3 flex justify-center" />
                </DetailsSections>
                <DetailsSections
                  component="button"
                  firstText="Waranty"
                  onClick={() => handleOpenModal("WARRANTY")}
                  isLast
                >
                  <FaCalendarAlt
                    size={26}
                    className="mr-3 flex justify-center"
                  />
                </DetailsSections>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ProductModal content={state.content} onClose={handleCloseModal} />
      )}
      <div className="flex flex-col mt-10 w-full justify-center items-center">
        <h1 className="text-3xl mb-4">Specification</h1>
        <article className="rounded-md border border-gray-300 shadow-md p-4 w-3/4">
          <h2 className="text-2xl mb-2">Description</h2>
          {data.shortDescription}
        </article>
        <ul className="my-4 w-3/4">
          {data.specifications.map(({ key, value }, index) => (
            <SpecificationElement
              key={key}
              left={key}
              right={value}
              index={index}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
