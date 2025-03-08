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
import Product from "../../../models/interface/product";
import ReviewStar from "../../../components/products/review/ReviewStar";

type State = {
  content: string;
};

type Action =
  | { type: "DELIVER" }
  | { type: "WARRANTY" }
  | { type: "BUY_NOW" }
  | { type: "ADD_REVIEW" };

function reducer(state: State, action: Action) {
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
  const [actualQuantity, setActualQuantity] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, { content: "" });

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductDetails(id),
  });

  const changeHandler = (value: string) => {
    const quantity = parseInt(value.replace(/[^0-9]/g, ""));
    setActualQuantity(
      Math.min(data.availableQuantity, quantity ? quantity : 0),
    );
  };

  const handleOpenModal = (type: Action["type"]) => {
    dispatch({ type });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddToCart = async (product: Product) => {
    if (actualQuantity !== 0) {
      dispatchCart(addToCartThunk({ product, quantity: actualQuantity }));
    }
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
            <ReviewStar list={data.reviews} />
            <Text className="text-lg text-darkText font-semibold">
              {data.price} zł
            </Text>
          </View>
        </View>
        <View className="flex-1 rounded-md shadow-md h-[23rem] w-full">
          <View className="flex flex-row items-center mt-2">
            <TextInput
              className="rounded-md text-center w-20 text-2xl border text-darkText border-darkBorder focus:outline-none focus:ring-0 focus:border-gray-500"
              value={actualQuantity.toString()}
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
