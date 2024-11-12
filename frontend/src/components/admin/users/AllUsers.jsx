import { useQuery, useQueryClient } from "@tanstack/react-query";
import ButtonAdmin from "../reusable/Buttons/ButtonAdmin.jsx";
import { deleteUser, getAllUser } from "../../../request/user.js";
import StateInfo from "../../ui/StateInfo.jsx";

export default function AllUsers() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryFn: getAllUser,
    queryKey: ["users"],
  });

  const handleDelete = async (id) => {
    await deleteUser(id);
    await queryClient.invalidateQueries("users");
  };

  return (
    <>
      <StateInfo error={error?.message} isLoading={isLoading} />
      {!isLoading && (
        <div className="grid justify-items-center w-full my-5">
          <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 border-b border-gray-300 w-full sm:w-1/2 py-2 font-semibold text-center">
            <span>First Name</span>
            <span>Last Name</span>
            <span>Email</span>
            <span>Birthday</span>
            <span>Role</span>
            <span>Action</span>
          </div>
          {data?.map((user) => (
            <div
              key={user._id}
              className="grid grid-cols-1 sm:grid-cols-6 gap-4 w-full sm:w-1/2 py-2 border-b border-gray-300 hover:bg-gray-100 justify-items-center items-center"
            >
              <span>{user.firstName}</span>
              <span>{user.lastName}</span>
              <span>{user.email}</span>
              <span>{new Date(user.birthday).toLocaleDateString("pl-PL")}</span>
              <span>{user.role}</span>
              <div className="flex justify-center">
                <ButtonAdmin
                  className="bg-red-500 hover:bg-red-600"
                  onClick={() => handleDelete(user._id)}
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
