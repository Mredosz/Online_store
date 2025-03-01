import { Pressable, Text } from "react-native";

export default function Button({ children, className, isValid, ...props }) {
  const classes = `py-2 px-4 mt-4 rounded-md bg-green-700 ${isValid && "active:bg-green-900"} ${className}`;

  return (
    <Pressable {...props} className={classes}>
      <Text>{children}</Text>
    </Pressable>
  );
}
