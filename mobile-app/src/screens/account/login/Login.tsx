import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../../request/account";
import FormDiv from "../../../components/form/FormDiv";
import Input from "../../../components/form/Input";
import useValidation from "../../../hooks/useValidation";
import { isDifferent } from "../../../validators/account";

const enteredDefault = {
  email: "",
  password: "",
};

const isEditDefault = {
  email: false,
  password: false,
};

export default function Login() {
  const [enteredValue, setEnteredValue] = useState(enteredDefault);
  const [isEdit, setIsEdit] = useState(isEditDefault);
  const [isValidate, setIsValidate] = useState(false);

  const validation = useValidation(enteredValue, isEdit);

  useEffect(() => {
    if (
      isDifferent(enteredValue, enteredDefault) &&
      isDifferent(isEdit, isEditDefault)
    ) {
      setIsValidate(Object.values(validation).every((field) => !field.value));
    }
  }, [enteredValue, isEdit, validation]);

  const { mutateAsync, error } = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: () => {
      setEnteredValue(enteredDefault);
      setIsEdit(isEditDefault);
      setIsValidate(false);
    },
  });

  const handleSubmit = async () => {
    await mutateAsync(enteredValue);
  };

  const handleInputChange = (
    id: keyof typeof enteredDefault,
    value: string,
  ) => {
    setEnteredValue((prev) => ({ ...prev, [id]: value }));
  };

  const handleInputBlur = (id: keyof typeof enteredDefault) => {
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
        onChangeText={(value) => handleInputChange("email", value)}
        value={enteredValue.email}
        onBlur={() => handleInputBlur("email")}
        error={validation.email}
      />
      <Input
        id="password"
        label="Password"
        secureTextEntry
        onChangeText={(value) => handleInputChange("password", value)}
        value={enteredValue.password}
        onBlur={() => handleInputBlur("password")}
        error={validation.password}
      />
    </FormDiv>
  );
}
