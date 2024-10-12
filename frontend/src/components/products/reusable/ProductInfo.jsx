export default function ProductInfo({ left, right }) {
  return (
    <div className="flex justify-between">
      <p className="font-bold">{left}</p>
      <p className="pr-3">{right}</p>
    </div>
  );
}
