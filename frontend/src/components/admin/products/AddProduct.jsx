import { useMutation } from "@tanstack/react-query";
import { addProduct } from "../../../request/products.js";
import { validation } from "../../../validators/productAdmin.js";
import FormAdmin from "../reusable/form/FormAdmin.jsx";

export default function AddProduct() {
  const { mutateAsync, isSuccess } = useMutation({
    mutationKey: ["addProduct"],
    mutationFn: addProduct,
  });

  const initialValues = {
    name: "",
    price: "",
    shortDescription: "",
    availableQuantity: "",
    deliveryPrice: "",
    image: "",
    specifications: [{ key: "", value: "" }],
  };
  const onSubmit = async (values, resetForm) => {
    await mutateAsync(values);
    resetForm();
  };

  return (
    <FormAdmin
      initialValues={initialValues}
      isSuccess={isSuccess}
      text="Edit product"
      isSuccessText="Product added successfully"
      validation={validation}
      onSubmit={onSubmit}
    />
  );
}
