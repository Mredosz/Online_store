import { Pressable, PressableProps } from "react-native";
import React, { ReactNode } from "react";

type AddButtonProp = PressableProps & {
  children: ReactNode[];
};

export default function AddButton({ children, ...props }: AddButtonProp) {
  return (
    <Pressable
      className="flex-1 flex-row justify-center items-center bg-green-700 active:bg-green-900 p-2 rounded-md mx-2 my-3"
      {...props}
    >
      {children}
    </Pressable>
  );
}
