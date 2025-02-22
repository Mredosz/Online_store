import * as Yup from "yup";

export const validation = Yup.object().shape({
  city: Yup.string()
    .required("City is required")
    .trim()
    .min(2, "City is too short")
    .max(50, "City is too long"),
  street: Yup.string()
    .required("Street is required")
    .trim()
    .min(2, "Street is too short")
    .max(50, "Street is too long"),
  postalCode: Yup.string()
    .required("Postal code is required")
    .trim()
    .min(5, "Postal code is too short")
    .max(6, "Postal code is too long"),
  homeNumber: Yup.string()
    .required("Home number is required")
    .trim()
    .min(1, "Home number is too short")
    .max(10, "Home number is too long"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^\d{9,15}$/, "Phone number is invalid")
    .min(9, "Phone number is too short")
    .max(15, "Phone number is too long"),
  deliveryType: Yup.string().required("Delivery type is required").trim(),
  paymentMethod: Yup.string().required("Payment method is required").trim(),
  cardNumber: Yup.string().when("paymentMethod", {
    is: "card",
    then: (t) =>
      t
        .required("Card number is required")
        .trim()
        .min(16, "Wrong card number")
        .max(16, "Wrong card number"),
    otherwise: (t) => t.notRequired(),
  }),
  cardExpiration: Yup.string().when("paymentMethod", {
    is: "card",
    then: (t) => t.required("Card expiration date is required").trim(),
    otherwise: (t) => t.notRequired(),
  }),
  cvv: Yup.string().when("paymentMethod", {
    is: "card",
    then: (t) =>
      t
        .required("CVV number is required")
        .trim()
        .min(3, "Wrong number")
        .max(4, "Wrong number"),
    otherwise: (t) => t.notRequired(),
  }),
});
