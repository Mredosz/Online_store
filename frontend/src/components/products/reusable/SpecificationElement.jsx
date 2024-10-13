export default function SpecificationElement({ right, left, index }) {
  let classes = "flex w-full py-2 hover:bg-gray-200 border-t border-gray-300";
  if (index % 2 === 0) {
    classes += " bg-gray-100";
  } else {
    classes += " bg-gray-50";
  }
  return (
    <li className={classes}>
      <span className="w-1/2 font-bold flex justify-center">
        <p className="text-left w-1/2">{left}</p>
      </span>
      <span className="w-1/2 text-left">{right}</span>
    </li>
  );
}
