import { Form, Formik } from "formik";
import Input from "../admin/reusable/form/Input.jsx";
import { validation } from "../../validators/delivery.js";
import { useNavigate } from "react-router-dom";
import Radio from "./reusable/Radio.jsx";
import { FaTruck } from "react-icons/fa";
import { PiPackage } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { addressAction } from "../../store/address-redux.jsx";
import CartDiv from "../cart/CartDiv.jsx";
import Button from "./reusable/Button.jsx";

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
        <Form>
          <div className="flex flex-col rounded-md border border-formBorder ">
            <Radio
              id="parcelLocker"
              name="deliveryType"
              label="Parcel Locker"
              value="parcelLocker"
            >
              <FaTruck size={26} className="mr-3" />
              12.99zł
            </Radio>
            <Radio
              id="courierDelivery"
              name="deliveryType"
              label="Courier Delivery"
              value="courier"
            >
              <PiPackage size={26} className="mr-3" /> 19.99zł
            </Radio>
          </div>
          <Input id="city" label="city" />
          <Input id="street" label="street" />
          <Input id="postalCode" label="postal code" />
          <Input id="homeNumber" label="home number" />
          <Input id="phoneNumber" label="phone number" />
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
      </Formik>
    </CartDiv>
  );
}
