export const isNotEmpty = (value) => {
  return value.trim().length > 0;
};

export const isEqualsToOtherValue = (value, otherValue) => {
  return value === otherValue;
};

export const isEmail = (value) => {
  return /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(value);
};

export const isPassword = (value) => {
  return /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/.test(
    value,
  );
};

export const isName = (value) => {
  return /^[a-zA-Z0-9_]{3,16}$/.test(value);
};

export const isDate = (value) => {
  return /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(value);
};

export const isDifferent = (obj1, obj2) => {
  return Object.keys(obj1).every((key) => obj1[key] !== obj2[key]);
};

export const isUserAdult = (value) => {
  const today = new Date();
  const birthday = new Date(value);

  let age = today.getFullYear() - birthday.getFullYear();

  const isBirthdayPassed =
    today.getMonth() > birthday.getMonth() ||
    (today.getMonth() === birthday.getMonth() &&
      today.getDate() >= birthday.getDate());

  if (!isBirthdayPassed) {
    age -= 1;
  }

  return age >= 18;
};
