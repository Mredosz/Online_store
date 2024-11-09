import { validationCategory } from "../../../validators/admin.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import FormAdmin from "../reusable/form/FormAdmin.jsx";
import Input from "../reusable/form/Input.jsx";
import { getCategoryById, updateCategory } from "../../../request/category.js";

export default function EditCategory() {
  const params = useParams();
  const queryClient = useQueryClient();

  const { mutateAsync, isSuccess } = useMutation({
    mutationKey: ["category", params.categoryId],
    mutationFn: (category) => updateCategory(category, params.categoryId),
  });

  const { data, isLoading } = useQuery({
    queryKey: ["categoryEdit", params.categoryId],
    queryFn: () => getCategoryById(params.categoryId),
  });

  if (!data) {
    return <div>No category data available</div>;
  }

  const initialValues = {
    ...data,
  };

  const onSubmit = async (values) => {
    await mutateAsync(values);
    await queryClient.invalidateQueries(["categoryEdit", params.categoryId]);
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <FormAdmin
      initialValues={initialValues}
      isSuccess={isSuccess}
      text="Edit category"
      isSuccessText="Category edited successfully"
      validation={validationCategory}
      onSubmit={onSubmit}
      buttonText="Edit category"
    >
      <Input label="name" id="name" type="text" />
    </FormAdmin>
  );
}
