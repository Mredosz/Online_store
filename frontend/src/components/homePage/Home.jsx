import { useQuery } from "@tanstack/react-query";
import Product from "../products/Product.jsx";
import { getAllProducts } from "../../request/products.js";
import { useLayoutEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
  //Todo do zrobienia trzymanie zalogowanego użytkownika

  // const [isLoggedIn, setIsLoggedIn] = useState(
  //   localStorage.getItem("is_logged_in"),
  // );
  // console.log(isLoggedIn);
  //
  // useLayoutEffect(() => {
  //   const fetchProtectedData = async () => {
  //     try {
  //       if (localStorage.getItem("is_logged_in")) {
  //         await axios.get("http://localhost:3000/protected", {
  //           withCredentials: true,
  //         });
  //       }
  //     } catch (e) {
  //       if (e.response && e.response.status === 307) {
  //         setIsLoggedIn(false);
  //         localStorage.removeItem("is_logged_in");
  //       }
  //     }
  //   };
  //
  //   fetchProtectedData();
  // }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex justify-center items-center">
      {data.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </div>
  );
}
