import { Text, View } from "react-native";

export const delivery = (
  <View className="gap-2">
    <Text className="text-xl font-semibold text-darkText">
      Delivery Information
    </Text>
    <Text className="text-darkText">
      In our store, we offer several delivery methods to suit your needs:
    </Text>
    <Text className="text-xl font-semibold text-darkText">
      Delivery to Parcel Locker
    </Text>
    <Text className="text-darkText">
      By choosing delivery to a Parcel Locker, your order will be sent to the
      selected InPost Parcel Locker. You will receive an SMS and an email with a
      pickup code when the package is ready for collection. Parcel Lockers are
      available 24/7, allowing you to pick up your package at your convenience.
    </Text>
    <View className="flex flex-row">
      <Text className="text-darkText">Price: </Text>
      <Text className="text-darkText">12.99 PLN</Text>
    </View>

    <Text className="text-xl font-semibold text-darkText">
      Courier Delivery
    </Text>
    <Text className="text-darkText">
      You can also choose courier delivery directly to your home or workplace.
      We work with the best courier companies to ensure fast and secure
      delivery. The courier will contact you by phone before delivering the
      package.
    </Text>
    <View className="flex flex-row">
      <Text className="text-darkText">Price: </Text>
      <Text className="text-darkText">19.99 PLN</Text>
    </View>

    <Text className="text-xl font-semibold text-darkText">
      Order Processing Time
    </Text>
    <Text className="text-darkText">
      The delivery time depends on the chosen method. Typically, delivery to a
      Parcel Locker takes 1-2 business days, while courier delivery takes 1
      business day.
    </Text>

    <Text className="text-darkText">
      Choose the most convenient delivery option for you when placing your
      order.
    </Text>
  </View>
);

export const warranty = (
  <View className="gap-2">
    <Text className="text-xl font-semibold text-darkText">
      Warranty Information
    </Text>
    <Text className="text-darkText">
      All products purchased in our store come with a 24-month warranty,
      starting from the date of purchase. During this period, if the product has
      any defects or malfunctions, we will repair or replace it free of charge.
    </Text>
    <Text className="text-darkText">
      Please keep your receipt as proof of purchase, as it will be required to
      make any warranty claims. The warranty does not cover damage caused by
      improper use, accidents, or unauthorized modifications.
    </Text>
    <Text className="text-darkText">
      For more detailed information about the warranty terms and conditions,
      please refer to the product's user manual or contact our customer support.
    </Text>
  </View>
);

export const buyNow = (
  <View className="gap-2">
    <Text className="text-xl font-semibold text-darkText">
      Buy now, get within two days
    </Text>
    <Text className="text-darkText">
      Place your order today, and you'll receive your items within a maximum of
      two business days. Our fast and reliable shipping ensures timely delivery
      for your convenience.
    </Text>
  </View>
);
