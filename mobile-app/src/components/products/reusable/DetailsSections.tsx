import { Text, TouchableOpacity, View } from "react-native";
import React from "react";

type DetailsSectionsProps = {
  component: string;
  children: React.ReactElement;
  firstText: string;
  secondText: string;
  isLast: boolean;
};

export default function DetailsSections({
  component,
  children,
  firstText,
  secondText,
  isLast,
  ...props
}: DetailsSectionsProps) {
  let classButton = "w-full p-3 flex flex-row items-center";

  classButton += !isLast ? " border-b-2 border-darkBg" : " rounded-b-md";

  return component !== "button" ? (
    <View className="flex flex-row justify-between p-3 border-b-2 border-darkBg">
      <Text className="font-bold text-darkText">{firstText}</Text>
      <Text className="pr-3 text-gray-500">{secondText}</Text>
    </View>
  ) : (
    <TouchableOpacity {...props} className={classButton}>
      {children}
      <View className="ml-3">
        <Text className="text-darkText">{firstText}</Text>
        <Text className="text-sm text-gray-500">{secondText}</Text>
      </View>
    </TouchableOpacity>
  );
}
