import { useQuery } from "@tanstack/react-query";
import { getOrderById } from "../../../request/order.js";
import { useParams } from "react-router-dom";
import ProductInfo from "../../products/reusable/ProductInfo.jsx";
import Summary from "../../delivery/reusable/Summary.jsx";

export default function OrderDetails() {
  const orderId = useParams().orderId;

  const { data, isLoading } = useQuery({
    queryKey: ["orders", orderId],
    queryFn: () => getOrderById(orderId),
  });

  if (isLoading) {
    return <div>Is loading ...</div>;
  }

  console.log(data);

  const { products, address, totalPrice, userId } = data;

  const firstTwoProducts = products.slice(0, 2);
  const remainingProducts = products.slice(2);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col bg-form my-10 p-5 rounded-md shadow-md w-1/2">
        <Summary
          first={firstTwoProducts}
          remaining={remainingProducts}
          finalPrice={totalPrice}
        >
          <ProductInfo left="First name:" right={userId.firstName} />
          <ProductInfo left="Last name:" right={userId.lastName} />
          <ProductInfo left="Email:" right={userId.email} />
          <ProductInfo left="City:" right={address.city} />
          <ProductInfo left="Postal code:" right={address.postalCode} />
          <ProductInfo left="Street:" right={address.street} />
          <ProductInfo left="Home number:" right={address.homeNumber} />
          <ProductInfo left="Phone number:" right={address.phoneNumber} />
          <ProductInfo left="Delivery type:" right={address.deliveryType} />
          <ProductInfo left="Payment method:" right={address.paymentMethod} />
        </Summary>
      </div>
    </div>
  );
}
