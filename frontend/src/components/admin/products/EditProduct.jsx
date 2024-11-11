import { validationProduct } from "../../../validators/admin.js";
import { getProductDetails, updateProduct } from "../../../request/products.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import FormAdmin from "../reusable/form/FormAdmin.jsx";
import Input from "../reusable/form/Input.jsx";
import { FieldArray } from "formik";
import { getAllCategory } from "../../../request/category.js";

export default function EditProduct() {
  const params = useParams();
  const queryClient = useQueryClient();

  const { mutateAsync, isSuccess } = useMutation({
    mutationKey: ["products", params.productId],
    mutationFn: (product) => updateProduct(product, params.productId),
  });

  const { data, isLoading } = useQuery({
    queryKey: ["productEdit", params.productId],
    queryFn: () => getProductDetails(params.productId),
  });

  const { data: categories, isLoading: isLoadingCat } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategory,
  });

  if (!data) {
    return <div>No product data available</div>;
  }

  const initialValues = {
    ...data,
    category: data.category.name,
    specifications: data.specifications || [],
  };

  const onSubmit = async (values) => {
    await mutateAsync(values);
    await queryClient.invalidateQueries(["productEdit", params.productId]);
  };

  if (isLoading || isLoadingCat) {
    return <div>Loading ...</div>;
  }

  return (
    <FormAdmin
      initialValues={initialValues}
      isSuccess={isSuccess}
      text="Edit product"
      isSuccessText="Product edited successfully"
      validation={validationProduct}
      onSubmit={onSubmit}
      buttonText="Edit product"
      isProduct
    >
      {({ values }) => (
        <>
          <Input label="name" id="name" type="text" />
          <Input label="category" id="category" select>
            {categories.map((c) => (
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
  );
}
