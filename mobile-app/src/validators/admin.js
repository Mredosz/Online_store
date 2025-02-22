import * as Yup from "yup";

export const validationProduct = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .trim()
    .max(50, "Max 50 characters"),
  price: Yup.number()
    .required("Price is required")
    .integer("Price must be integer")
    .min(0, "Price must be positive"),
  shortDescription: Yup.string()
    .required("Short description is required")
    .trim()
    .max(500, "Max 500 characters"),
  availableQuantity: Yup.number()
    .required("Available quantity is required")
    .integer("Available quantity must be integer")
    .min(0, "Available quantity must be positive"),
  image: Yup.string().required("Image is required").trim(),
  specifications: Yup.array().of(
    Yup.object().shape({
      key: Yup.string()
        .required("Key is required")
        .trim()
        .max(50, "Max 50 characters"),
      value: Yup.string()
        .required("Value is required")
        .trim()
        .max(50, "Max 50 characters"),
    }),
  ),
});

export const validationCategory = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .trim()
    .max(50, "Max 50 characters"),
});
