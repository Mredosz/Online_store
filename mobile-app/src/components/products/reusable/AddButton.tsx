import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import React, { ReactNode } from "react";

type AddButtonProp = TouchableOpacityProps & {
  children: ReactNode[];
};

export default function AddButton({ children, ...props }: AddButtonProp) {
  return (
    <TouchableOpacity
      className="flex-1 flex-row justify-center items-center bg-green-700 p-2 rounded-md mx-2 my-3"
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
}
