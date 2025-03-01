import { buyNow, delivery, warranty } from "./content";
import { View, Text, Pressable } from "react-native";
import Modal from "react-native-modal";
import React from "react";

type ProductModalProps = {
  isVisible: boolean;
  onClose: () => void;
  content?: "warranty" | "delivery" | "buy_now";
  children?: React.ReactNode;
  button?: React.ReactElement;
};

export default function ProductModal({
  isVisible,
  onClose,
  content,
  children,
  button,
}: ProductModalProps) {
  const getContent = () => {
    switch (content) {
      case "warranty":
        return warranty;
      case "delivery":
        return delivery;
      case "buy_now":
        return buyNow;
      default:
        return null;
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.5}
      onBackdropPress={onClose}
      className="flex items-center justify-center"
    >
      <View className="bg-darkBgSoft p-5 rounded-2xl w-11/12">
        <Text className="text-lg font-semibold mb-3 text-darkText">
          {getContent()}
        </Text>
        {children}

        <View className="flex-row space-x-3 mt-4">
          <Pressable
            onPress={onClose}
            className="px-4 py-2 bg-darkBgMuted rounded-lg"
          >
            <Text className="text-darkText">{children ? "No" : "Close"}</Text>
          </Pressable>
          {button}
        </View>
      </View>
    </Modal>
  );
}
