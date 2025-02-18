import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../../request/account";
import FormDiv from "../../../components/form/FormDiv";
import Input from "../../../components/form/Input";

export default function Login() {
  const initialValues = {
    email: "",
    password: "",
  };

  const [enteredValue, setEnteredValue] = useState(initialValues);
  const [isEdit, setIsEdit] = useState({ email: false, password: false });
  const [isValidate, setIsValidate] = useState(false);

  const { mutateAsync, error, data, isSuccess } = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: () => {
      setEnteredValue(initialValues);
      setIsEdit({ email: false, password: false });
      setIsValidate(false);
    },
  });

  const handleSubmit = async () => {
    await mutateAsync(enteredValue);
  };

  const handleInputChange = (id: keyof typeof initialValues, value: string) => {
    setEnteredValue((prev) => ({ ...prev, [id]: value }));
  };

  const handleInputBlur = (id: keyof typeof initialValues) => {
    setIsEdit((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <FormDiv
      buttonText="Login"
      topText="Login"
      handleSubmit={handleSubmit}
      type="/register"
      accountText="Don't have an account yet?"
      error={error}
      alert={error?.response?.data?.errors}
      isValidate={isValidate}
    >
      <Input
        id="email"
        label="Email"
        type="email"
        onChangeText={(value) => handleInputChange("email", value)}
        value={enteredValue.email}
        onBlur={() => handleInputBlur("email")}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        secureTextEntry
        onChangeText={(value) => handleInputChange("password", value)}
        value={enteredValue.password}
        onBlur={() => handleInputBlur("password")}
      />
    </FormDiv>
  );
}
