import { TouchableOpacity } from "react-native";

export default function AddButton({ children, ...props }) {
  return (
    <TouchableOpacity
      className="flex-1 flex-row justify-center items-center bg-green-500 p-2 rounded-md mx-2 my-3 hover:bg-green-700"
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
}
