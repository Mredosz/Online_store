import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Image, Text, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import useDebounce from "../../hooks/useDebounce";
import {
  changeQuantityThunk,
  deleteProductThunk,
} from "../../store/cart-redux";
import { colors } from "../../utils/colors";

export default function CartItem({ product, quantity }) {
  const dispatch = useDispatch();
  const [actualQuantity, setActualQuantity] = useState(quantity);
  const debouncingQuantity = useDebounce(actualQuantity, 500);

  const changeHandler = (event) => {
    const quantity = Math.floor(event.target.value);
    if (quantity > product.availableQuantity) {
      setActualQuantity(product.availableQuantity);
    } else {
      setActualQuantity(quantity);
    }
  };

  useEffect(() => {
    if (debouncingQuantity !== quantity) {
      dispatch(changeQuantityThunk({ product, quantity: debouncingQuantity }));
    }
  }, [debouncingQuantity, dispatch, product, quantity]);

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
          className="rounded-md h-10 w-20 text-xl border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-500"
          value={actualQuantity}
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
