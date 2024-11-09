import { useMutation } from "@tanstack/react-query";
import { addProduct } from "../../../request/products.js";
import { validationProduct } from "../../../validators/admin.js";
import FormAdmin from "../reusable/form/FormAdmin.jsx";
import Input from "../reusable/form/Input.jsx";
import { FieldArray } from "formik";

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
      text="Add product"
      isSuccessText="Product added successfully"
      validation={validationProduct}
      onSubmit={onSubmit}
      buttonText="Add product"
      isProduct
    >
      {({ values }) => (
        <>
          <Input label="name" id="name" type="text" />
          <Input label="price" id="price" type="number" />
          <Input label="short description" id="shortDescription" textarea />
          <Input
            label="available quantity"
            id="availableQuantity"
            type="number"
          />
          <Input label="delivery price" id="deliveryPrice" type="number" />
          <Input label="image" id="image" type="text" />
          <FieldArray name="specifications">
            {({ push, remove }) => (
              <div className="mt-2">
                <h4 className="text-2xl font-semibold text-center">
                  Specification
                </h4>
                {values.specifications.map((specification, index) => (
                  <div key={index} className="mt-5">
                    <div className="flex">
                      <Input
                        id={`specifications[${index}].key`}
                        label="key"
                        type="text"
                        className="mr-3"
                      />
                      <Input
                        id={`specifications[${index}].value`}
                        label="value"
                        type="text"
                      />
                    </div>
                    <button
                      type="button"
                      className="bg-red-500 hover:bg-red-600 mt-2 py-1 rounded-md w-full"
                      onClick={() => remove(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="bg-yellow-500 hover:bg-yellow-600 mt-2 py-1 rounded-md w-full"
                  onClick={() => push({ key: "", value: "" })}
                >
                  Add
                </button>
              </div>
            )}
          </FieldArray>
        </>
      )}
    </FormAdmin>
  );
}
