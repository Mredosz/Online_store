import { useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteProduct, getAllProducts } from "../../../request/products.js";
import Th from "../reusable/table/Th.jsx";
import Td from "../reusable/table/Td.jsx";
import { useNavigate } from "react-router-dom";
import ButtonAdmin from "../reusable/Buttons/ButtonAdmin.jsx";

export default function AllProducts() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryFn: getAllProducts,
    queryKey: ["products"],
  });

  const handleDelete = async (id) => {
    await deleteProduct(id);
    await queryClient.invalidateQueries("products");
  };

  const handleEdit = async (id) => {
    navigate(`/admin/products/${id}`);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex justify-center items-center w-full my-5">
      <table className="table-auto border-collapse border-gray-300 w-1/2">
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Available</Th>
            <Th>Price</Th>
            <Th>Image</Th>
            <Th></Th>
            <Th></Th>
          </tr>
        </thead>
        <tbody>
          {data.map((product) => (
            <tr key={product._id} className="hover:bg-gray-100">
              <Td>{product.name}</Td>
              <Td>{product.availableQuantity}</Td>
              <Td>{product.price}</Td>
              <Td className="text-center">
                <img
                  alt={product.name}
                  className="h-40 inline-block"
                  src={product.image}
                />
              </Td>
              <Td>
                <ButtonAdmin
                  className="bg-yellow-500 hover:bg-yellow-600"
                  onClick={() => handleEdit(product._id)}
                >
                  Edit
                </ButtonAdmin>
              </Td>
              <Td>
                <ButtonAdmin
                  className="bg-red-500 hover:bg-red-600"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </ButtonAdmin>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
