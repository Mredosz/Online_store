import DeliveryEndList from "./deliveryEnd/DeliveryEndList.jsx";

export default function Summary({ children, first, remaining, finalPrice }) {
  return (
    <>
      <h1 className="text-3xl text-center font-semibold">Finalize</h1>
      <div className="flex space-x-3 mt-6">
        <DeliveryEndList className="space-y-5" products={first} />
        <div className="flex flex-col px-2 py-3 w-1/2 justify-between rounded-md border border-formBorder shadow-md bg-white">
          <div>
            <h1 className="text-xl text-center font-semibold">Address</h1>
            {children}
          </div>
          <div className="flex space-x-3">
            <p className="text-lg font-semibold">Total price: </p>
            <p className="text-lg">{finalPrice.toLocaleString("pl-PL")} zł</p>
          </div>
        </div>
      </div>
      <DeliveryEndList className="space-y-5 mt-5" products={remaining} />
    </>
  );
}
