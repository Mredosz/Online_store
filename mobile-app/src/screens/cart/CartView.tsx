import { Text, View } from "react-native";

export default function CartView({ children, alert }) {
  return (
    <>
      <View>{alert?.map((err) => <Text key={err.msg}>{err.msg}</Text>)}</View>
      <View className="flex-1 bg-darkBg p-3">{children}</View>
    </>
  );
}
