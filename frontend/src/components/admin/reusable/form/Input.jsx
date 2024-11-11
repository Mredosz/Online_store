import { ErrorMessage, Field } from "formik";

export default function Input({
  label,
  textarea,
  select,
  id,
  className,
  ...props
}) {
  const classes = `rounded-md border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-500 ${className}`;
  let type = "input";
  if (textarea) {
    type = "textarea";
  } else if (select) {
    type = "select";
  }

  return (
    <div className="flex flex-col mt-2 w-full">
      <label
        className="uppercase font-semibold mb-1 text-gray-500"
        htmlFor={id}
      >
        {label}
      </label>
      <Field className={classes} name={id} as={type} {...props} />
      <ErrorMessage
        className="text-red-500 font-semibold"
        name={id}
        component="div"
      />
    </div>
  );
}
