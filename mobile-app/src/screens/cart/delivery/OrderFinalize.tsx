import { Text, View } from "react-native";

export default function OrderFinalize() {
  return (
    <View className="flex flex-col text-lg space-y-5">
      <Text className="text-center text-3xl font-semibold">
        Thank you for your order!
      </Text>
      TextYour order has been successfully placed.Text
      <View className="tracking-info">
        TextYou can track your order in the My Orders section.Text TextWe will
        notify you once your order has been shipped.Text
      </View>
      <View className="thank-you">
        TextThank you for shopping with us!Text TextYou will receive an email
        with your invoice shortly.Text
      </View>
      <View className="contact-support">
        Text Need help? Contact our customer support at capy@store.com or call{" "}
        <Text className="font-semibold">567 586 568</Text>. Text
      </View>
      <View className="additional-info">
        Text Your order is being processed. An e-mail confirmation has been sent
        to your email address. Text TextWe hope you enjoy your purchase!Text
      </View>
    </View>
  );
}
