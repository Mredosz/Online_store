import { Form, Formik } from "formik";
import Input from "../admin/reusable/form/Input.jsx";
import { validation } from "../../validators/delivery.js";
import { useNavigate } from "react-router-dom";
import { FaTruck } from "react-icons/fa";
import { PiPackage } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { addressAction } from "../../store/address-redux.jsx";
import CartDiv from "../cart/CartDiv.jsx";
import Button from "./reusable/Button.jsx";
import { CiCreditCard1 } from "react-icons/ci";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import RadioGroup from "./reusable/RadioGroup.jsx";

const deliveryOptions = [
  {
    id: "parcelLocker",
    value: "parcelLocker",
    label: "Parcel Locker",
    icon: FaTruck,
    price: "12.99zł",
  },
  {
    id: "courier",
    value: "courier",
    label: "Courier Delivery",
    icon: PiPackage,
    price: "19.99zł",
  },
];

const paymentOptions = [
  {
    id: "card",
    value: "card",
    label: "Card",
    icon: CiCreditCard1,
  },
  {
    id: "transfer",
    value: "transfer",
    label: "Transfer",
    icon: FaMoneyBillTransfer,
  },
];

export default function Delivery() {
  const navigate = useNavigate();
  const address = useSelector((state) => state.address);
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(addressAction.add(values));
    navigate("/cart/end");
  };

  return (
    <CartDiv>
      <h1 className="text-3xl text-center font-semibold">Delivery form</h1>
      <Formik
        initialValues={address}
        onSubmit={handleSubmit}
        validationSchema={validation}
      >
        {({ values }) => (
          <Form>
            <RadioGroup options={deliveryOptions} name="deliveryType" />
            <RadioGroup options={paymentOptions} name="paymentMethod" />
            <Input id="city" label="city" />
            <Input id="street" label="street" />
            <Input id="postalCode" label="postal code" />
            <Input id="homeNumber" label="home number" />
            <Input id="phoneNumber" label="phone number" />
            {values.paymentMethod === "card" && (
              <>
                <Input id="cardNumber" label="card number" />
                <div className="flex space-x-3">
                  <Input
                    id="cardExpiration"
                    label="card expiration"
                    type="month"
                  />
                  <Input id="cvv" label="cvv" />
                </div>
              </>
            )}
            <div className="flex space-x-3">
              <Button
                onClick={() => navigate("/cart")}
                className="w-full bg-red-500 hover:bg-red-600"
              >
                Back
              </Button>
              <Button type="submit" className="w-full">
                Next
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </CartDiv>
  );
}
