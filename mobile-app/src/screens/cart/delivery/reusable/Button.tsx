import { Pressable, PressableProps, Text } from "react-native";

type ButtonProps = PressableProps & {
  isValid?: boolean;
  children: string;
};

export default function Button({
  children,
  className,
  isValid,
  ...props
}: ButtonProps) {
  const classes = `py-2 px-4 mt-4 rounded-md bg-green-500 ${isValid && "hover:bg-green-700"} ${className}`;

  return (
    <Pressable {...props} className={classes}>
      <Text className="text-darkText text-center">{children}</Text>
    </Pressable>
  );
}
