import { useMutation, useQuery } from "@tanstack/react-query";
import { changeOrderStatus, getAllOrders } from "../../../request/order.js";
import ButtonAdmin from "../reusable/Buttons/ButtonAdmin.jsx";
import { useNavigate } from "react-router-dom";
import StateInfo from "../../ui/StateInfo.jsx";

export default function AllOrders() {
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });

  const { mutateAsync, isSuccess } = useMutation({
    mutationKey: ["orders"],
    mutationFn: ({ id, status }) => changeOrderStatus(id, status),
  });

  const handleDetails = (id) => {
    navigate(`${id}`);
  };

  const handleChangeStatus = async (event, id) => {
    await mutateAsync({ id, status: event.target.value });
  };

  return (
    <>
      <StateInfo error={error?.message} isLoading={isLoading} />
      {isSuccess && (
        <h1 className="text-3xl text-green-400 text-center font-semibold mt-2">
          Status changed successfully
        </h1>
      )}
      {!isLoading && (
        <div className="grid justify-items-center w-full px-3 md:my-5">
          <div className="grid grid-cols-1 sm:grid-cols-4 text-center gap-4 border-b border-gray-300 w-full sm:w-3/4 py-2 font-semibold">
            <span>User</span>
            <span>Date</span>
            <span>Total price</span>
            <span>Action</span>
          </div>
          {data?.map((order) => (
            <div
              className="grid grid-cols-1 items-center justify-items-center sm:grid-cols-4 gap-4 w-full sm:w-3/4 py-2 border-b border-gray-300 hover:bg-gray-100"
              key={order._id}
            >
              <span>{order.userId?.email}</span>
              <span>{new Date(order.date).toLocaleDateString("pl-PL")}</span>
              <span>{order.totalPrice.toLocaleString("pl-PL")}</span>
              <div className="space-x-2">
                <select
                  onChange={(event) => handleChangeStatus(event, order._id)}
                  className="rounded-md border-0 hover:ring-0"
                  defaultValue={order?.status}
                >
                  <option value="processing">Processing</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <ButtonAdmin
                  className="bg-yellow-500 hover:bg-yellow-600"
                  onClick={() => handleDetails(order._id)}
                >
                  Details
                </ButtonAdmin>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
