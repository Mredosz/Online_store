import { useQuery } from "@tanstack/react-query";
import { getProductDetails } from "../../../request/products";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { useReducer, useState } from "react";
import AddButton from "../../../components/products/reusable/AddButton";
import { useDispatch } from "react-redux";
import { addToCartThunk } from "../../../store/cart-redux";
import DetailsSections from "../../../components/products/reusable/DetailsSections";
import Icon from "react-native-vector-icons/FontAwesome5";
import { colors } from "../../../utils/colors";
import ProductModal from "../../../components/products/modal/ProductModal";
import SpecificationElement from "../../../components/products/reusable/SpecificationElement";
import ReviewsAll from "../../../components/products/review/ReviewsAll";

function reducer(state, action) {
  switch (action.type) {
    case "DELIVER":
      return { content: "delivery" };
    case "WARRANTY":
      return { content: "warranty" };
    case "BUY_NOW":
      return { content: "buy_now" };
    case "ADD_REVIEW":
      return { content: "add_review" };
    default:
      return state;
  }
}

type RootStackParamList = {
  ProductDetails: { _id: string };
};
type ProductDetailsRouteProp = RouteProp<RootStackParamList, "ProductDetails">;

export default function ProductDetails({
  route,
}: {
  route: ProductDetailsRouteProp;
}) {
  const id = route.params._id;

  const dispatchCart = useDispatch();
  const [actualQuantity, setActualQuantity] = useState("1");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, { content: "" });

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductDetails(id),
  });

  const changeHandler = (value: number) => {
    const quantity = Math.floor(value);
    if (quantity > data.availableQuantity) {
      setActualQuantity(data.availableQuantity.toString());
    } else {
      setActualQuantity(quantity);
    }
  };

  const handleOpenModal = (type) => {
    dispatch({ type });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddToCart = async (product) => {
    dispatchCart(addToCartThunk({ product, quantity: actualQuantity }));
  };

  if (isLoading) {
    return <Text>"Loading..."</Text>;
  }

  return (
    <ScrollView>
      <View className="flex-1 justify-center items-center">
        <View className="flex-1 w-full items-center bg-darkBgSoft rounded-md">
          <Image
            source={{ uri: data.image }}
            accessibilityLabel={data.name}
            className="w-full h-[80%] rounded-md p-2 aspect-square"
          />
          <View className="flex-1 w-full p-2 mt-2 gap-2">
            <Text className="text-3xl text-darkText">{data.name}</Text>
            {/*<ReviewStar list={data.reviews} />*/}
            <Text className="text-lg text-darkText font-semibold">
              {data.price} zł
            </Text>
          </View>
        </View>
        <View className="flex-1 rounded-md shadow-md h-[23rem] w-full">
          <View className="flex flex-row items-center mt-2">
            <TextInput
              className="rounded-md text-center w-20 text-2xl border text-darkText border-darkBorder focus:outline-none focus:ring-0 focus:border-gray-500"
              value={actualQuantity}
              keyboardType="numeric"
              onChangeText={changeHandler}
            />
            <AddButton onPress={() => handleAddToCart(data)}>
              <Icon name="shopping-cart" color={colors.darkText} />
              <Text className="ml-2 text-white">Add to cart</Text>
            </AddButton>
          </View>
          <View className="bg-darkBgSoft rounded-md mt-2">
            <DetailsSections
              component="div"
              firstText="Available"
              secondText={data.availableQuantity}
            />
            <DetailsSections
              component="button"
              firstText="Buy now, get on Tuesday"
              secondText="Click for more information"
              onPress={() => handleOpenModal("BUY_NOW")}
            >
              <Icon name="clock" size={26} color={colors.darkText} />
            </DetailsSections>
            <DetailsSections
              component="button"
              firstText="Free Deliver"
              secondText="Click for more information"
              onPress={() => handleOpenModal("DELIVER")}
            >
              <Icon name="truck" size={26} color={colors.darkText} />
            </DetailsSections>
            <DetailsSections
              component="button"
              firstText="Waranty"
              onPress={() => handleOpenModal("WARRANTY")}
              isLast
            >
              <Icon name="calendar" size={26} color={colors.darkText} />
            </DetailsSections>
          </View>
        </View>
      </View>
      <ProductModal
        isVisible={isModalOpen}
        onClose={handleCloseModal}
        content={state.content}
      />
      <View className="items-center mb-4 gap-4">
        <Text className="text-3xl text-darkText">Specification</Text>
        <View className="rounded-md border border-darkBorder shadow-md p-4">
          <Text className="text-2xl mb-2 text-darkText">Description</Text>
          <Text className="text-darkText">{data.shortDescription}</Text>
        </View>
        <FlatList
          className="w-full px-2"
          data={data.specifications}
          keyExtractor={(item) => item.key}
          scrollEnabled={false}
          renderItem={({ item, index }) => (
            <SpecificationElement
              key={item.key}
              left={item.key}
              right={item.value}
              index={index}
            />
          )}
        />
      </View>
      {/*<RecommendedProducts />*/}
      <ReviewsAll onClick={() => handleOpenModal("ADD_REVIEW")} id={id} />
    </ScrollView>
  );
}
