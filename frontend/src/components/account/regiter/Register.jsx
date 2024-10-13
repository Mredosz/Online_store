import Input from "../reusable/Input.jsx";
import Button from "../reusable/Button.jsx";
import { useMutation } from "@tanstack/react-query";
import { register } from "../../../request/account.js";
import { useEffect, useLayoutEffect, useState } from "react";
import useValidation from "../../../hooks/useValidation.js";
import { isDifferent, isEmail } from "../../../validators/account.js";

export default function Register() {
  const { enteredDefault, isEditDefault } = {
    enteredDefault: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      birthday: "",
    },
    isEditDefault: {
      firstName: false,
      lastName: false,
      email: false,
      password: false,
      confirmPassword: false,
      birthday: false,
    },
  };

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
    mutationKey: "register",
    mutationFn: register,
    onSuccess: () => {
      setEnteredValue(enteredDefault);
      setIsEdit(isEditDefault);
      setIsValidate(false);
    },
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await mutateAsync({ ...enteredValue, role: "user" });
    } catch (e) {
      console.log(e.response.data.errors);
    }
  };

  const handleInputChange = (id, event) => {
    setEnteredValue((prevState) => ({
      ...prevState,
      [id]: event.target.value,
    }));
  };

  const handleInputBlur = (id) => {
    setIsEdit((prevState) => ({
      ...prevState,
      [id]: true,
    }));
  };
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-168px)] bg-[url('/register.png')] bg-cover bg-center">
      <form
        className="flex flex-col bg-form p-4 rounded-md shadow-md w-[29rem]"
        onSubmit={handleSubmit}
      >
        <h1 className="flex justify-center text-3xl text-gray-500 mb-4 uppercase font-semibold">
          Create account
        </h1>
        {isSuccess && (
          <p className="text-center text-xl text-gray-600">Account created!</p>
        )}
        {error && (
          <p className="text-center text-xl text-red-600">
            {error.response.data.message}
          </p>
        )}
        <div className="flex">
          <Input
            id="firstName"
            label="First name"
            className="mr-4"
            type={"text"}
            onChange={(event) => handleInputChange("firstName", event)}
            value={enteredValue.firstName}
            onBlur={() => handleInputBlur("firstName")}
            error={validation.firstName}
          />
          <Input
            id="lastName"
            label="Last name"
            type={"text"}
            onChange={(event) => handleInputChange("lastName", event)}
            value={enteredValue.lastName}
            onBlur={() => handleInputBlur("lastName")}
            error={validation.lastName}
          />
        </div>
        <Input
          id="birthday"
          label="Birthday"
          type={"date"}
          onChange={(event) => handleInputChange("birthday", event)}
          value={enteredValue.birthday}
          onBlur={() => handleInputBlur("birthday")}
          error={validation.birthday}
        />
        <Input
          id="email"
          label="Email"
          type={"email"}
          onChange={(event) => handleInputChange("email", event)}
          value={enteredValue.email}
          onBlur={() => handleInputBlur("email")}
          error={validation.email}
        />
        <Input
          id="password"
          label="Password"
          type={"password"}
          onChange={(event) => handleInputChange("password", event)}
          value={enteredValue.password}
          onBlur={() => handleInputBlur("password")}
          error={validation.password}
        />
        <Input
          id="confirmPassword"
          label="Confirm password"
          type={"password"}
          onChange={(event) => handleInputChange("confirmPassword", event)}
          value={enteredValue.confirmPassword}
          onBlur={() => handleInputBlur("confirmPassword")}
          error={validation.confirmPassword}
        />
        <Button className="bg-green-400 mt-8" isValidate={isValidate}>
          Register
        </Button>
      </form>
    </div>
  );
}
