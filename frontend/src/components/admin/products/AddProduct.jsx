import { useMutation, useQuery } from "@tanstack/react-query";
import { addProduct } from "../../../request/products.js";
import { validationProduct } from "../../../validators/admin.js";
import FormAdmin from "../reusable/form/FormAdmin.jsx";
import Input from "../reusable/form/Input.jsx";
import { FieldArray } from "formik";
import { getAllCategory } from "../../../request/category.js";
import StateInfo from "../../ui/StateInfo.jsx";

export default function AddProduct() {
  const { mutateAsync, isSuccess, error } = useMutation({
    mutationKey: ["addProduct"],
    mutationFn: addProduct,
  });

  const {
    data: categories,
    isLoading,
    error: errorCat,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategory,
  });

  const initialValues = {
    name: "",
    price: "",
    shortDescription: "",
    availableQuantity: "",
    image: "",
    specifications: [{ key: "", value: "" }],
  };
  const onSubmit = async (values, resetForm) => {
    await mutateAsync(values);
    resetForm();
  };

  return (
    <>
      <StateInfo error={errorCat?.message} isLoading={isLoading} />
      {!isLoading && (
        <FormAdmin
          initialValues={initialValues}
          isSuccess={isSuccess}
          text="Add product"
          isSuccessText="Product added successfully"
          validation={validationProduct}
          onSubmit={onSubmit}
          buttonText="Add product"
          isProduct
          alert={error?.response.data.errors}
        >
          {({ values }) => (
            <>
              <Input label="name" id="name" type="text" />
              <Input label="category" id="category" select>
                {categories?.map((c) => (
                  <option value={c.name} key={c.name}>
                    {c.name}
                  </option>
                ))}
              </Input>
              <Input label="price" id="price" type="number" />
              <Input label="short description" id="shortDescription" textarea />
              <Input
                label="available quantity"
                id="availableQuantity"
                type="number"
              />
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
      )}
    </>
  );
}
