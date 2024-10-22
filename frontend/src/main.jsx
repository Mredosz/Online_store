import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import cartStore from "./store/cart-redux.jsx";
import { Provider } from "react-redux";
import AccountProvider from "./store/account-context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={cartStore}>
      <AccountProvider>
        <App />
      </AccountProvider>
    </Provider>
  </StrictMode>,
);
