import { RouterProvider } from "react-router-dom";
import router from "./routing/route.jsx";

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
