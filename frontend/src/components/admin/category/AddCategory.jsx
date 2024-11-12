import { useMutation } from "@tanstack/react-query";
import { validationCategory } from "../../../validators/admin.js";
import FormAdmin from "../reusable/form/FormAdmin.jsx";
import { addCategory } from "../../../request/category.js";
import Input from "../reusable/form/Input.jsx";

export default function AddCategory() {
  const { mutateAsync, isSuccess, error } = useMutation({
    mutationKey: ["addCategory"],
    mutationFn: addCategory,
  });

  const initialValues = {
    name: "",
  };

  const onSubmit = async (values, resetForm) => {
    await mutateAsync(values);
    resetForm();
  };

  return (
    <FormAdmin
      initialValues={initialValues}
      isSuccess={isSuccess}
      text="Add category"
      isSuccessText="Category added successfully"
      validation={validationCategory}
      onSubmit={onSubmit}
      buttonText="Add category"
      alert={error?.response.data.errors}
    >
      <Input label="name" id="name" type="text" />
    </FormAdmin>
  );
}
