import { useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteProduct, getAllProducts } from "../../../request/products.js";
import { useNavigate } from "react-router-dom";
import ButtonAdmin from "../reusable/Buttons/ButtonAdmin.jsx";
import StateInfo from "../../ui/StateInfo.jsx";

export default function AllProducts() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
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

  return (
    <>
      <StateInfo error={error?.message} isLoading={isLoading} />
      {!isLoading && (
        <div className="grid justify-items-center w-full my-5">
          <div className="grid grid-cols-2 sm:grid-cols-5 text-center gap-4 border-b border-gray-300 w-full sm:w-3/4 py-2 font-semibold">
            <span>Name</span>
            <span>Available</span>
            <span>Price</span>
            <span>Image</span>
            <span>Actions</span>
          </div>
          {data?.map((product) => (
            <div
              key={product._id}
              className="grid grid-cols-2 sm:grid-cols-5 items-center justify-items-center gap-4 w-full sm:w-3/4 py-2 border-b border-gray-300 hover:bg-gray-100"
            >
              <span>{product.name}</span>
              <span>{product.availableQuantity}</span>
              <span>{product.price}</span>
              <div className="flex justify-center">
                <img
                  alt={product.name}
                  className="h-40 inline-block"
                  src={product.image}
                />
              </div>
              <div className="flex space-x-2">
                <ButtonAdmin
                  className="bg-yellow-500 hover:bg-yellow-600"
                  onClick={() => handleEdit(product._id)}
                >
                  Edit
                </ButtonAdmin>
                <ButtonAdmin
                  className="bg-red-500 hover:bg-red-600"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </ButtonAdmin>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
