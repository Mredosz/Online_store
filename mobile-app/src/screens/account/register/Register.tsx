import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { register } from "../../../request/account";
import FormDiv from "../../../components/form/FormDiv";
import Input from "../../../components/form/Input";
import useValidation from "../../../hooks/useValidation";
import { isDifferent } from "../../../validators/account";

const enteredDefault = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  birthday: "",
};

const isEditDefault = {
  firstName: false,
  lastName: false,
  email: false,
  password: false,
  confirmPassword: false,
  birthday: false,
};

export default function Register() {
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

  const { mutateAsync, error, isSuccess } = useMutation({
    mutationKey: ["register"],
    mutationFn: register,
    onSuccess: () => {
      setEnteredValue(enteredDefault);
      setIsEdit(isEditDefault);
      setIsValidate(false);
    },
  });

  const handleSubmit = async () => {
    await mutateAsync({ ...enteredValue, role: "user" });
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
      error={error}
      buttonText="Register"
      handleSubmit={handleSubmit}
      isSuccess={isSuccess}
      topText="Create account"
      isValidate={isValidate}
      type="/login"
      accountText="Do you have account already?"
      alert={error?.response.data.errors}
    >
      <Input
        id="firstName"
        label="First name"
        onChangeText={(value) => handleInputChange("firstName", value)}
        value={enteredValue.firstName}
        onBlur={() => handleInputBlur("firstName")}
        error={validation.firstName}
      />
      <Input
        id="lastName"
        label="Last name"
        onChangeText={(value) => handleInputChange("lastName", value)}
        value={enteredValue.lastName}
        onBlur={() => handleInputBlur("lastName")}
        error={validation.lastName}
      />
      <Input
        id="birthday"
        label="Birthday"
        onChangeText={(value) => handleInputChange("birthday", value)}
        value={enteredValue.birthday}
        onBlur={() => handleInputBlur("birthday")}
        error={validation.birthday}
      />
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
        onChangeText={(value) => handleInputChange("password", value)}
        value={enteredValue.password}
        onBlur={() => handleInputBlur("password")}
        error={validation.password}
      />
      <Input
        id="confirmPassword"
        label="Confirm password"
        onChangeText={(value) => handleInputChange("confirmPassword", value)}
        value={enteredValue.confirmPassword}
        onBlur={() => handleInputBlur("confirmPassword")}
        error={validation.confirmPassword}
      />
    </FormDiv>
  );
}
