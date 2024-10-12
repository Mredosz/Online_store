export default function DetailsSections({
  component,
  children,
  firstText,
  secondText,
  isLast,
}) {
  let classDiv = "flex justify-between p-3";

  !isLast ? (classDiv += " border-b border-gray-300") : "";

  return component !== "button" ? (
    <div className={classDiv}>
      <p className="font-bold">{firstText}</p>
      <p className="pr-3">{secondText}</p>
    </div>
  ) : (
    <button
      onClick={() => console.log("click")}
      className="hover:bg-gray-200 border-b border-gray-300 w-full p-3 flex items-center"
    >
      {children}
      <div>
        <p className="flex items-start">{firstText}</p>
        <p className="text-sm flex items-start text-gray-500">{secondText}</p>
      </div>
    </button>
  );
}
