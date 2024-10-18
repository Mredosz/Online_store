import { FieldArray, Form, Formik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { addProduct } from "../../../request/products.js";
import InputAdmin from "../reusable/form/InputAdmin.jsx";

export default function AddProduct() {
  const { mutateAsync } = useMutation({
    mutationKey: ["addProduct"],
    mutationFn: addProduct,
  });

  return (
    <div className="w-1/2 flex justify-center items-center">
      <Formik
        initialValues={{
          name: "",
          price: "",
          shortDescription: "",
          availableQuantity: "",
          deliveryPrice: "",
          image: "",
          specifications: [{ key: "", value: "" }],
        }}
        onSubmit={async (values, { resetForm }) => {
          await mutateAsync(values);
          resetForm();
        }}
      >
        {({ handleSubmit, values }) => (
          <Form
            onSubmit={handleSubmit}
            className="bg-form min-w-96 border border-formBorder p-4 rounded-md my-3"
          >
            <h1 className="flex justify-center text-3xl text-gray-500 mb-4 uppercase font-semibold">
              Add Product
            </h1>
            <InputAdmin label="name" id="name" type="text" />
            <InputAdmin label="price" id="price" type="number" />
            <InputAdmin
              label="short description"
              id="shortDescription"
              textarea
            />
            <InputAdmin
              label="available quantity"
              id="availableQuantity"
              type="number"
            />
            <InputAdmin
              label="delivery price"
              id="deliveryPrice"
              type="number"
            />
            <InputAdmin label="image" id="image" type="text" />
            <FieldArray name={"specifications"}>
              {({ push, remove }) => (
                <div className="mt-2">
                  <h4 className="text-2xl font-semibold text-center">
                    Specification
                  </h4>
                  {values.specifications.map((specification, index) => (
                    <div key={index} className="mt-5">
                      <div className="flex">
                        <InputAdmin
                          id={`specifications[${index}].key`}
                          label="key"
                          type="text"
                          className="mr-3"
                        />
                        <InputAdmin
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
            <button
              type="submit"
              className="w-full mt-5 py-2 bg-green-400 hover:bg-green-600 rounded-md"
            >
              Add product
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
