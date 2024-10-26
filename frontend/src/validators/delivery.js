import * as Yup from "yup";

export const validation = Yup.object({
  city: Yup.string()
    .required("City is required")
    .min(2, "City is too short")
    .max(50, "City is too long"),
  street: Yup.string()
    .required("Street is required")
    .min(2, "Street is too short")
    .max(50, "Street is too long"),
  postalCode: Yup.string()
    .required("Postal code is required")
    .min(5, "Postal code is too short")
    .max(6, "Postal code is too long"),
  homeNumber: Yup.string()
    .required("Home number is required")
    .min(1, "Home number is too short")
    .max(10, "Home number is too long"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .min(9, "Phone number is too short")
    .max(15, "Phone number is too long"),
});
