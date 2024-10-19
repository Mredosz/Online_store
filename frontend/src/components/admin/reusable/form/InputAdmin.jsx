import { ErrorMessage, Field } from "formik";

export default function InputAdmin({
  label,
  textarea,
  id,
  className,
  ...props
}) {
  const classes = `rounded-md border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-500 ${className}`;

  return (
    <div className="flex flex-col mt-2">
      <label
        className="uppercase font-semibold mb-1 text-gray-500"
        htmlFor={id}
      >
        {label}
      </label>
      <Field
        className={classes}
        name={id}
        as={textarea ? "textarea" : "input"}
        {...props}
      />
      <ErrorMessage
        className="text-red-500 font-semibold"
        name={id}
        component="div"
      />
    </div>
  );
}
