import { useQuery, useQueryClient } from "@tanstack/react-query";
import Th from "../reusable/table/Th.jsx";
import Td from "../reusable/table/Td.jsx";
import ButtonAdmin from "../reusable/Buttons/ButtonAdmin.jsx";
import { deleteUser, getAllUser } from "../../../request/user.js";

export default function AllUsers() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryFn: getAllUser,
    queryKey: ["users"],
  });

  const handleDelete = async (id) => {
    await deleteUser(id);
    await queryClient.invalidateQueries("users");
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex justify-center items-center w-full my-5">
      <table className="table-auto border-collapse border-gray-300 w-1/2">
        <thead>
          <tr>
            <Th>First Name</Th>
            <Th>Last Name</Th>
            <Th>Email</Th>
            <Th>Birthday</Th>
            <Th>Role</Th>
            <Th></Th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user._id} className="hover:bg-gray-100">
              <Td>{user.firstName}</Td>
              <Td>{user.lastName}</Td>
              <Td>{user.email}</Td>
              <Td>{new Date(user.birthday).toLocaleDateString("pl-PL")}</Td>
              <Td>{user.role}</Td>
              <Td>
                <ButtonAdmin
                  className="bg-red-500 hover:bg-red-600"
                  onClick={() => handleDelete(user._id)}
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
