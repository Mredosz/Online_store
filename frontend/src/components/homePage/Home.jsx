import { useQuery } from "@tanstack/react-query";
import Product from "../products/Product.jsx";
import { getAllProducts } from "../../request/products.js";
import { useContext, useLayoutEffect } from "react";
import { protect } from "../../request/account.js";
import { AccountContext } from "../../store/account-context.jsx";

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  const { setIsLogged } = useContext(AccountContext);
  const isLogged = localStorage.getItem("is_logged_in");

  useLayoutEffect(() => {
    setIsLogged(isLogged);
    const fetchProtectedData = async () => {
      try {
        if (isLogged) {
          await protect();
        }
      } catch (e) {
        if (e.response && e.response.status === 307) {
          setIsLogged(false);
          localStorage.removeItem("is_logged_in");
        }
      }
    };

    fetchProtectedData();
  }, [isLogged, setIsLogged]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex justify-center items-center">
      {data.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </div>
  );
}
