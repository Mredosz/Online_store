import { validation } from "../../../validators/productAdmin.js";
import { getProductDetails, updateProduct } from "../../../request/products.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import FormAdmin from "../reusable/form/FormAdmin.jsx";

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

  if (!data) {
    return <div>No product data available</div>;
  }

  const initialValues = {
    ...data,
    specifications: data.specifications || [],
  };

  const onSubmit = async (values) => {
    await mutateAsync(values);
    queryClient.invalidateQueries(["productEdit", params.productId]);
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <FormAdmin
      initialValues={initialValues}
      isSuccess={isSuccess}
      text="Edit product"
      isSuccessText="Product edited successfully"
      validation={validation}
      onSubmit={onSubmit}
    />
  );
}
