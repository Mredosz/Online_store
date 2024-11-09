import { useQuery, useQueryClient } from "@tanstack/react-query";
import Th from "../reusable/table/Th.jsx";
import Td from "../reusable/table/Td.jsx";
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
    <div className="flex justify-center items-center w-full my-5">
      <table className="table-auto border-collapse border-gray-300 w-1/2">
        <thead>
          <tr>
            <Th>Name</Th>
            <Th></Th>
            <Th></Th>
          </tr>
        </thead>
        <tbody>
          {data.map((category) => (
            <tr key={category._id} className="hover:bg-gray-100">
              <Td>{category.name}</Td>
              <Td>
                <ButtonAdmin
                  className="bg-yellow-500 hover:bg-yellow-600"
                  onClick={() => handleEdit(category._id)}
                >
                  Edit
                </ButtonAdmin>
              </Td>
              <Td>
                <ButtonAdmin
                  className="bg-red-500 hover:bg-red-600"
                  onClick={() => handleDelete(category._id)}
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
