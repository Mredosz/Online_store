import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductDetails } from "../../request/products.js";
import { FaCartPlus, FaClock, FaTruck } from "react-icons/fa";
import ProductInfo from "./reusable/ProductInfo.jsx";
import DetailsSections from "./reusable/DetailsSections.jsx";

export default function ProductDetails() {
  const params = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["products", params.productId],
    queryFn: () => getProductDetails(params.productId),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center bg-gray-50 h-full min-h-[calc(100vh-168px)]">
      <div className="flex mt-9 h-full w-full justify-center">
        <div className="flex h-1/4 w-1/4 mr-20">
          <img src={data.image} alt={data.name} className="h-full w-full" />
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
              <div className="border-b border-gray-300 w-full p-4">
                <p className="flex justify-end text-3xl">{data.price} $</p>
                <button className="flex justify-center items-center bg-green-500 hover:bg-green-700 p-2 rounded-md m-3">
                  <FaCartPlus /> Add to cart
                </button>
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
                >
                  <FaClock size={26} className="mr-3 flex justify-center" />
                </DetailsSections>
                <DetailsSections
                  component="button"
                  firstText="Free Deliver"
                  secondText="Click for more information"
                >
                  <FaTruck size={26} className="mr-3 flex justify-center" />
                </DetailsSections>
                <DetailsSections
                  component="div"
                  firstText="Available"
                  secondText={data.availableQuantity}
                  isLast
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        Długi opis i specyfikacja
      </div>
    </div>
  );
}
