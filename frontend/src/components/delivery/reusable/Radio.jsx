import { ErrorMessage, Field } from "formik";

export default function Radio({
  label,
  id,
  name,
  className,
  children,
  ...props
}) {
  return (
    <div className="flex hover:bg-formBorder p-3 items-center rounded-md ">
      <Field
        className="h-5 w-5 mr-3 text-formBorder checked:border-0 border-0 focus:outline-none focus:ring-0 focus:border-0"
        id={id}
        name={name}
        type="radio"
        {...props}
      />
      <label
        className="uppercase font-semibold text-gray-500 w-full"
        htmlFor={id}
      >
        {label}
      </label>
      <span className="uppercase flex text-end">{children}</span>
      <ErrorMessage
        className="text-red-500 font-semibold"
        name={name}
        component="div"
      />
    </div>
  );
}
