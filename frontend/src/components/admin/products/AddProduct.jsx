import Input from "../../account/reusable/Input.jsx";

export default function AddProduct() {
  return (
    <div className="w-full flex justify-center items-center">
      <form className="w-96 bg-amber-400 p-4 rounded-md ">
        <Input label="name" id="name" type="text" />
        <Input label="price" id="price" type="number" />
        <Input label="short description" id="shortDescription" textarea />
        <Input
          label="available quantity"
          id="availableQuantity"
          type="number"
        />
        <Input label="delivery price" id="deliveryPrice" type="number" />
      </form>
    </div>
  );
}
