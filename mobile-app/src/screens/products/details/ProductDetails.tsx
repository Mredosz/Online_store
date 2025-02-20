import { useQuery } from "@tanstack/react-query";
import { getProductDetails } from "../../../request/products";
import { Image, ScrollView, Text, View } from "react-native";
import { RouteProp } from "@react-navigation/native";

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

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductDetails(id),
  });
  if (isLoading) {
    return <Text>"Loading..."</Text>;
  }

  return (
    <ScrollView>
      <View className="flex-1 mt-7 h-full w-full justify-center">
        <Image
          source={{ uri: data.image }}
          accessibilityLabel={data.name}
          className="w-2/5 h-1/2 rounded-md aspect-square"
        />
        <View>
          <View className="flex flex-col pt-3 pl-3 mb-2">
            <Text className="text-3xl mb-2 text-darkText">{data.name}</Text>
            {/*<ReviewStar list={data.reviews} />*/}
          </View>
          <View className="flex space-x-5">
            <View className="flex flex-col rounded-md border border-gray-300 shadow-md h-[23rem] w-64">
              <View className="border-b border-gray-300 w-full pt-4">
                <Text className="flex justify-end text-3xl mr-4 text-darkText">
                  {data.price} zł
                </Text>
                <View className="flex mt-3 justify-center">
                  {/*<input*/}
                  {/*    type={"number"}*/}
                  {/*    className="rounded-md h-10 w-20 mt-3 text-xl border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-500"*/}
                  {/*    value={actualQuantity}*/}
                  {/*    min={1}*/}
                  {/*    max={data.availableQuantity}*/}
                  {/*    onChange={changeHandler}*/}
                  {/*/>*/}
                  {/*<AddButton onClick={() => handleAddToCart(data)}>*/}
                  {/*    <FaCartPlus className="text-white" />*/}
                  {/*    <p className="ml-2 text-white">Add to cart</p>*/}
                  {/*</AddButton>*/}
                </View>
              </View>
              {/*<div>*/}
              {/*    <DetailsSections*/}
              {/*        component="div"*/}
              {/*        firstText="Available"*/}
              {/*        secondText={data.availableQuantity}*/}
              {/*    />*/}
              {/*    <DetailsSections*/}
              {/*        component="button"*/}
              {/*        firstText="Buy now, get on Tuesday"*/}
              {/*        secondText="Click for more information"*/}
              {/*        onClick={() => handleOpenModal("BUY_NOW")}*/}
              {/*    >*/}
              {/*        <FaClock size={26} className="mr-3 flex justify-center" />*/}
              {/*    </DetailsSections>*/}
              {/*    <DetailsSections*/}
              {/*        component="button"*/}
              {/*        firstText="Free Deliver"*/}
              {/*        secondText="Click for more information"*/}
              {/*        onClick={() => handleOpenModal("DELIVER")}*/}
              {/*    >*/}
              {/*        <FaTruck size={26} className="mr-3 flex justify-center" />*/}
              {/*    </DetailsSections>*/}
              {/*    <DetailsSections*/}
              {/*        component="button"*/}
              {/*        firstText="Waranty"*/}
              {/*        onClick={() => handleOpenModal("WARRANTY")}*/}
              {/*        isLast*/}
              {/*    >*/}
              {/*        <FaCalendarAlt*/}
              {/*            size={26}*/}
              {/*            className="mr-3 flex justify-center"*/}
              {/*        />*/}
              {/*    </DetailsSections>*/}
              {/*</div>*/}
            </View>
          </View>
        </View>
      </View>
      {/*{isModalOpen && (*/}
      {/*    <ProductModal content={state.content} onClose={handleCloseModal} />*/}
      {/*)}*/}
      <View className="flex flex-col mt-10 sm:w-full md:w-3/4 justify-center items-center">
        <Text className="text-3xl mb-4 text-darkText">Specification</Text>
        <View className="rounded-md border border-gray-300 shadow-md p-4 w-3/4">
          <Text className="text-2xl mb-2 text-darkText">Description</Text>
          <Text className="text-darkText">{data.shortDescription}</Text>
        </View>
        {/*<ul className="my-4 w-3/4">*/}
        {/*    {data.specifications.map(({ key, value }, index) => (*/}
        {/*        <SpecificationElement*/}
        {/*            key={key}*/}
        {/*            left={key}*/}
        {/*            right={value}*/}
        {/*            index={index}*/}
        {/*        />*/}
        {/*    ))}*/}
        {/*</ul>*/}
      </View>
      {/*<RecommendedProducts />*/}
      {/*<ReviewsAll onClick={() => handleOpenModal("ADD_REVIEW")} />*/}
    </ScrollView>
  );
}
