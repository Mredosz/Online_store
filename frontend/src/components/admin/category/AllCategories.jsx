import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ButtonAdmin from "../reusable/Buttons/ButtonAdmin.jsx";
import { deleteCategory, getAllCategory } from "../../../request/category.js";

export default function AllCategories() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryFn: getAllCategory,
    queryKey: ["categories"],
  });

  const handleDelete = async (id) => {
    await deleteCategory(id);
    await queryClient.invalidateQueries("categories");
  };

  const handleEdit = async (id) => {
    navigate(`/admin/category/${id}`);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="grid justify-items-center w-full my-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-300 w-full sm:w-1/2 py-2 font-semibold text-center">
        <span>Name</span>
        <span>Actions</span>
      </div>
      {data.map((category) => (
        <div
          key={category._id}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full sm:w-1/2 py-2 border-b border-gray-300 hover:bg-gray-100 items-center justify-items-center"
        >
          <span>{category.name}</span>
          <div className="flex space-x-2">
            <ButtonAdmin
              className="bg-yellow-500 hover:bg-yellow-600"
              onClick={() => handleEdit(category._id)}
            >
              Edit
            </ButtonAdmin>
            <ButtonAdmin
              className="bg-red-500 hover:bg-red-600"
              onClick={() => handleDelete(category._id)}
            >
              Delete
            </ButtonAdmin>
          </div>
        </div>
      ))}
    </div>
  );
}
