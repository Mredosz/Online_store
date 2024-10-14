import FormDiv from "../reusable/FormDiv.jsx";
import { useEffect, useRef, useState } from "react";
import Input from "../reusable/Input.jsx";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../../request/account.js";
import { useNavigate } from "react-router-dom";
import {
  isEmail,
  isNotEmpty,
  isPassword,
} from "../../../validators/account.js";

export default function Login() {
  const [emailIsInvalid, setEmailIsInvalid] = useState({
    value: false,
    message: "",
  });
  const [passwordIsInvalid, setPasswordIsInvalid] = useState({
    value: false,
    message: "",
  });

  const navigate = useNavigate();

  const email = useRef();
  const password = useRef();

  //Todo powiadominie do error i obsługa redux
  const { mutateAsync, error, data, isSuccess } = useMutation({
    mutationKey: "login",
    mutationFn: login,
  });

  useEffect(() => {
    if (isSuccess) {
      navigate(data.role === "user" ? "/" : "/admin");
    }
  }, [isSuccess]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;

    let isValid = true;

    if (!isNotEmpty(enteredEmail)) {
      setEmailIsInvalid({ value: true, message: "Email can't be empty." });
      isValid = false;
    } else if (!isEmail(enteredEmail)) {
      setEmailIsInvalid({ value: true, message: "Email must be valid." });
      isValid = false;
    }

    if (!isNotEmpty(enteredPassword)) {
      setPasswordIsInvalid({
        value: true,
        message: "Password can't be empty.",
      });
      isValid = false;
    } else if (!isPassword(enteredPassword)) {
      setPasswordIsInvalid({ value: true, message: "Password must be valid." });
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    setPasswordIsInvalid({ value: false, message: "" });
    setEmailIsInvalid({ value: false, message: "" });

    try {
      await mutateAsync({
        email: email.current.value,
        password: password.current.value,
      });
    } catch (e) {
      //Todo zrobić wyświetlanie error
      console.log(e.response.data.errors);
    }
  };
  return (
    <FormDiv
      buttonText="Login"
      topText="Login"
      handleSubmit={handleSubmit}
      type={"/register"}
      accountText="Don't have an account yet?"
      error={error}
    >
      <Input
        ref={email}
        id="email"
        label="email"
        type="text"
        error={emailIsInvalid}
      />
      <Input
        ref={password}
        id="password"
        label="password"
        type="password"
        error={passwordIsInvalid}
      />
    </FormDiv>
  );
}
