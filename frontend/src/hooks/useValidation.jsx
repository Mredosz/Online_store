import {
  isNotEmpty,
  isName,
  isEmail,
  isPassword,
  isEqualsToOtherValue,
  isDate,
  isUserAdult,
} from "../validators/account.js";
import { useEffect, useState } from "react";

export default function useValidation(enteredValue, isEdit) {
  const createValidationMessage = (
    field,
    emptyMessage,
    invalidMessage,
    validationFn,
  ) => {
    return !isNotEmpty(enteredValue[field])
      ? emptyMessage
      : !validationFn(enteredValue[field]) && invalidMessage;
  };

  const [validation, setValidation] = useState({
    firstName: { value: false, message: "" },
    lastName: { value: false, message: "" },
    email: { value: false, message: "" },
    password: { value: false, message: "" },
    confirmPassword: { value: false, message: "" },
    birthday: { value: false, message: "" },
  });

  useEffect(() => {
    const isValid = {
      firstName: {
        value: isEdit.firstName && !isName(enteredValue.firstName),
        message: createValidationMessage(
          "firstName",
          "First name can't be empty.",
          "First name must contain 3 to 16.",
          isName,
        ),
      },
      lastName: {
        value: isEdit.lastName && !isName(enteredValue.lastName),
        message: createValidationMessage(
          "lastName",
          "Last name can't be empty.",
          "Last name must contain 3 to 16.",
          isName,
        ),
      },
      email: {
        value: isEdit.email && !isEmail(enteredValue.email),
        message: createValidationMessage(
          "email",
          "Email can't be empty.",
          "Email must be valid.",
          isEmail,
        ),
      },
      password: {
        value: isEdit.password && !isPassword(enteredValue.password),
        message: createValidationMessage(
          "password",
          "Password can't be empty.",
          "Password must be at least 8 characters long, " +
            "contain a lowercase letter, an uppercase letter," +
            " a number, and a special character.",
          isPassword,
        ),
      },
      confirmPassword: {
        value:
          isEdit.confirmPassword &&
          (!isPassword(enteredValue.confirmPassword) ||
            !isEqualsToOtherValue(
              enteredValue.confirmPassword,
              enteredValue.password,
            )),
        message: createValidationMessage(
          "confirmPassword",
          "Confirm password can't be empty.",
          "Passwords must match.",
          (value) =>
            isPassword(value) &&
            isEqualsToOtherValue(value, enteredValue.password),
        ),
      },
      birthday: {
        value:
          isEdit.birthday ||
          (isDate(enteredValue.birthday) &&
            !isUserAdult(enteredValue.birthday)),
        message: createValidationMessage(
          "birthday",
          "Birthday can't be empty.",
          "User must be adult.",
          (value) => isDate(value) && isUserAdult(value),
        ),
      },
    };
    setValidation(isValid);
  }, [enteredValue, isEdit]);

  return validation;
}
