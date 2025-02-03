import FormDiv from "../reusable/FormDiv.jsx";
import { useEffect, useRef, useState } from "react";
import Input from "../reusable/Input.jsx";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../../request/account.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { accountAction } from "../../../store/account-redux.jsx";
import useValidation from "../../../hooks/useValidation.jsx";
import { isDifferent } from "../../../validators/account.js";

export default function Login() {
  const { enteredDefault, isEditDefault } = {
    enteredDefault: {
      email: "",
      password: "",
    },
    isEditDefault: {
      email: false,
      password: false,
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutateAsync, error, data, isSuccess } = useMutation({
    mutationKey: "login",
    mutationFn: login,
    onSuccess: () => {
      setEnteredValue(enteredDefault);
      setIsEdit(isEditDefault);
      setIsValidate(false);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(accountAction.login({ isLogged: true, isAdmin: data?.role }));
      navigate(data?.role === "user" ? "/" : "/admin");
    }
  }, [data?.role, dispatch, isSuccess, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await mutateAsync(enteredValue);
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
    <FormDiv
      buttonText="Login"
      topText="Login"
      handleSubmit={handleSubmit}
      type="/register"
      accountText="Don't have an account yet?"
      error={error}
      alert={error?.response.data.errors}
      isValidate={isValidate}
    >
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
    </FormDiv>
  );
}
