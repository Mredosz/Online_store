export default function Input({ label, error, id, className, ...props }) {
  let classes = `rounded-md border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-500 ${className}`;
  return (
    <div className="flex flex-col mt-2">
      <label
        className="uppercase font-semibold mb-1 text-gray-500"
        htmlFor={id}
      >
        {label}
      </label>
      <input id={id} className={classes} {...props} />
      <div>
        {error.value && (
          <p className="text-red-500 break-words">{error.message}</p>
        )}
      </div>
    </div>
  );
}
