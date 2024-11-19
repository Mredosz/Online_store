import StateInfo from "../../ui/StateInfo.jsx";
import { useQuery } from "@tanstack/react-query";
import { getReports } from "../../../request/order.js";

export default function Reports() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["reports"],
    queryFn: getReports,
  });

  return (
    <>
      <StateInfo error={error?.message} isLoading={isLoading} />
      {!isLoading && (
        <div className="grid justify-items-center w-full my-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 text-center gap-4 border-b border-gray-300 w-full sm:w-3/4 py-2 font-semibold">
            <span>Name</span>
            <span>Image</span>
            <span>Total Quantity</span>
            <span>Total Amount Spent</span>
          </div>
          {data?.map((product) => (
            <div
              key={product.productDetails._id}
              className="grid grid-cols-2 sm:grid-cols-4 items-center justify-items-center gap-4 w-full sm:w-3/4 py-2 border-b border-gray-300 hover:bg-gray-100"
            >
              <span>{product.productDetails.name}</span>
              <div className="flex justify-center">
                <img
                  alt={product.productDetails.name}
                  className="h-40 inline-block"
                  src={product.productDetails.image}
                />
              </div>
              <span>{product.totalQuantity}</span>
              <span>{product.totalAmountSpent.toLocaleString("pl-PL")} zł</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
