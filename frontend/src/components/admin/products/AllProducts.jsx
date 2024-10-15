export default function AllProducts({ products }) {
  return (
    <div>
      <table className="table-auto border-collapse border border-gray-500">
        <thead>
          <tr>
            <th className="border border-gray-500">Name</th>
            <th className="border border-gray-500">Available</th>
            <th className="border border-gray-500">Price</th>
            <th className="border border-gray-500">Image</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="border border-gray-500">{product.name}</td>
              <td className="border border-gray-500">
                {product.availableQuantity}
              </td>
              <td className="border border-gray-500">{product.price}</td>
              <td className="border border-gray-500">
                <img alt={product.name} className="h-40" src={product.image} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
