import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../../../request/order.js";
import ButtonAdmin from "../reusable/Buttons/ButtonAdmin.jsx";
import { useNavigate } from "react-router-dom";

export default function AllOrders() {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });

  if (isLoading) {
    return <div>Is loading ...</div>;
  }

  const handleDetails = (id) => {
    navigate(`${id}`);
  };

  return (
    <div className="grid justify-items-center w-full mx-3 md:my-5">
      <div className="grid grid-cols-1 sm:grid-cols-4 text-center gap-4 border-b border-gray-300 w-full sm:w-3/4 py-2 font-semibold">
        <span>User</span>
        <span>Date</span>
        <span>Total price</span>
        <span>Action</span>
      </div>
      {data.map((order) => (
        <div
          className="grid grid-cols-1 items-center justify-items-center sm:grid-cols-4 gap-4 w-full sm:w-3/4 py-2 border-b border-gray-300 hover:bg-gray-100"
          key={order._id}
        >
          <span>{order.userId?.email}</span>
          <span>{new Date(order.date).toLocaleDateString("pl-PL")}</span>
          <span>{order.totalPrice}</span>
          <ButtonAdmin
            className="bg-yellow-500 hover:bg-yellow-600"
            onClick={() => handleDetails(order._id)}
          >
            Details
          </ButtonAdmin>
        </div>
      ))}
    </div>
  );
}
