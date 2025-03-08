import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Image, Text, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import useDebounce from "../../hooks/useDebounce";
import {
  changeQuantityThunk,
  deleteProductThunk,
} from "../../store/cart-redux";
import { colors } from "../../utils/colors";
import Product from "../../models/interface/product";

type CartItemProp = {
  product: Product;
  quantity: number;
};

export default function CartItem({ product, quantity }: CartItemProp) {
  const dispatch = useDispatch();
  const [actualQuantity, setActualQuantity] = useState<number>(quantity);
  const debouncingQuantity = useDebounce(actualQuantity, 500);

  const prevQuantity = useRef(quantity);

  const changeHandler = (value: string) => {
    const quantity = parseInt(value.replace(/[^0-9]/g, ""));
    setActualQuantity(
      Math.min(product.availableQuantity, quantity ? quantity : 0),
    );
  };

  useEffect(() => {
    if (debouncingQuantity !== prevQuantity.current) {
      prevQuantity.current = debouncingQuantity;
      dispatch(changeQuantityThunk({ product, quantity: debouncingQuantity }));
    }
  }, [debouncingQuantity, dispatch, product, quantity]);

  useEffect(() => {
    setActualQuantity(quantity);
  }, [quantity]);

  const handleDelete = () => {
    dispatch(deleteProductThunk(product));
  };

  return (
    <View className="w-full flex flex-row p-3 rounded-md justify-between bg-darkBgSoft">
      <Image
        source={{ uri: product.image }}
        accessibilityLabel={product.name}
        className="w-[30%] h-full rounded-md aspect-square"
      />
      <View className="flex pl-2 gap-5 w-1/2 justify-between">
        <Text className="text-lg text-darkText">{product.name}</Text>
        <TextInput
          keyboardType="numeric"
          className="rounded-md h-10 w-20 border text-darkText text-center border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-500"
          value={actualQuantity.toString()}
          onChangeText={changeHandler}
        />
      </View>
      <View className="flex items-end justify-between">
        <Icon
          name="trash"
          size={25}
          color={colors.darkText}
          onPress={handleDelete}
        />
        <Text className="text-lg text-darkText">{product.price} zł</Text>
      </View>
    </View>
  );
}
