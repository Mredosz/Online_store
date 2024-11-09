import { useQuery } from "@tanstack/react-query";
import Th from "../reusable/table/Th.jsx";
import { getAllOrders } from "../../../request/order.js";
import ButtonAdmin from "../reusable/Buttons/ButtonAdmin.jsx";
import Td from "../reusable/table/Td.jsx";
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
    <div className="flex justify-center items-center w-full my-5">
      <table className="table-auto border-collapse border-gray-300 w-3/4">
        <thead>
          <tr>
            <Th>User</Th>
            <Th>Date</Th>
            <Th>Total price</Th>
            <Th></Th>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr className="hover:bg-gray-100">
              <Td>{order.userId?.email}</Td>
              <Td>{new Date(order.date).toLocaleDateString("pl-PL")}</Td>
              <Td>{order.totalPrice}</Td>
              <Td>
                <ButtonAdmin
                  className="bg-yellow-500 hover:bg-yellow-600"
                  onClick={() => handleDetails(order._id)}
                >
                  Details
                </ButtonAdmin>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
