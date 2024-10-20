export default function DetailsSections({
  component,
  children,
  firstText,
  secondText,
  isLast,
  ...props
}) {
  let classButton = "hover:bg-gray-200 w-full p-3 flex items-center";

  classButton += !isLast ? " border-b border-gray-300" : " rounded-b-md";

  return component !== "button" ? (
    <div className="flex justify-between p-3 border-b border-gray-300">
      <p className="font-bold">{firstText}</p>
      <p className="pr-3">{secondText}</p>
    </div>
  ) : (
    <button {...props} className={classButton}>
      {children}
      <div>
        <p className="flex items-start">{firstText}</p>
        <p className="text-sm flex items-start text-gray-500">{secondText}</p>
      </div>
    </button>
  );
}
