import { ErrorMessage, Field } from "formik";
import { PressableProps, Text, View } from "react-native";
import { ReactNode } from "react";

type RadioProps = PressableProps & {
  label: string;
  id: string;
  name: string;
  children: ReactNode;
  value: string;
};

export default function Radio({
  label,
  id,
  name,
  className,
  children,
  ...props
}: RadioProps) {
  return (
    <View className="flex hover:bg-formBorder p-3 items-center rounded-md ">
      <Field
        className="h-5 w-5 mr-3 text-formBorder checked:border-0 border-0 focus:outline-none focus:ring-0 focus:border-0"
        id={id}
        name={name}
        type="radio"
        {...props}
      />
      <Text className="uppercase font-semibold text-gray-500 w-full">
        {label}
      </Text>
      <Text className="uppercase flex text-end">{children}</Text>
      <ErrorMessage
        className="text-red-500 font-semibold"
        name={name}
        component="div"
      />
    </View>
  );
}
