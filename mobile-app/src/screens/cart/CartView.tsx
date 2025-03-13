import { Text, View } from "react-native";
import { ReactNode } from "react";

type CartViewProps = {
  children: ReactNode;
  alert?: {
    msg: string;
  }[];
};

export default function CartView({ children, alert }: CartViewProps) {
  return (
    <>
      <View>{alert?.map((err) => <Text key={err.msg}>{err.msg}</Text>)}</View>
      <View className="flex-1 h-full bg-darkBg p-3">{children}</View>
    </>
  );
}
