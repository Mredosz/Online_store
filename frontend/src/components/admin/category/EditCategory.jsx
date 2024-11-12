import { validationCategory } from "../../../validators/admin.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import FormAdmin from "../reusable/form/FormAdmin.jsx";
import Input from "../reusable/form/Input.jsx";
import { getCategoryById, updateCategory } from "../../../request/category.js";
import StateInfo from "../../ui/StateInfo.jsx";

export default function EditCategory() {
  const params = useParams();
  const queryClient = useQueryClient();

  const { mutateAsync, isSuccess, error } = useMutation({
    mutationKey: ["category", params.categoryId],
    mutationFn: (category) => updateCategory(category, params.categoryId),
  });

  const {
    data,
    isLoading,
    error: errorDow,
  } = useQuery({
    queryKey: ["categoryEdit", params.categoryId],
    queryFn: () => getCategoryById(params.categoryId),
  });

  if (isLoading) {
    return <StateInfo isLoading={isLoading} />;
  }

  if (!data) {
    return <StateInfo error="Category data is not available" />;
  }

  const initialValues = {
    ...data,
  };

  const onSubmit = async (values) => {
    await mutateAsync(values);
    await queryClient.invalidateQueries(["categoryEdit", params.categoryId]);
  };

  return (
    <>
      <StateInfo error={errorDow} isLoading={isLoading} />
      <FormAdmin
        initialValues={initialValues}
        isSuccess={isSuccess}
        text="Edit category"
        isSuccessText="Category edited successfully"
        validation={validationCategory}
        onSubmit={onSubmit}
        buttonText="Edit category"
        alert={error?.response.data.errors}
      >
        <Input label="name" id="name" type="text" />
      </FormAdmin>
    </>
  );
}
