import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import AccountProvider from "./store/account-context.jsx";
import store from "./store/store-redux.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AccountProvider>
        <App />
      </AccountProvider>
    </Provider>
  </StrictMode>,
);
