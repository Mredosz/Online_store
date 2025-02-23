import { Text, View } from "react-native";

type SpecificationElementProps = {
  right: string;
  left: string;
  index: number;
};

export default function SpecificationElement({
  right,
  left,
  index,
}: SpecificationElementProps) {
  let classes =
    "flex flex-row w-full items-center py-2 border-t-2 border-darkBg";
  if (index % 2 === 0) {
    classes += " bg-darkBgMuted";
  } else {
    classes += " bg-darkBgSoft";
  }
  return (
    <View className={classes}>
      <View className="w-1/2 font-bold flex justify-center">
        <Text className="text-left pl-2 text-darkText">{left}</Text>
      </View>
      <Text className="text-left text-darkText">{right}</Text>
    </View>
  );
}
