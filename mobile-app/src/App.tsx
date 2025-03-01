import { StatusBar } from "react-native";
import BottomTabs from "./routing/bottom-tabs/BottomTabs";
import "../global.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store-redux";
import AccountStack from "./routing/stack/AccountStack";
import { useLayoutEffect } from "react";
import { protect } from "./request/account";
import { cartActions, fetchCartData } from "./store/cart-redux";
import { accountAction } from "./store/account-redux";
import { AxiosError } from "axios";

export default function App() {
  const isLogged = useSelector<RootState>((state) => state.account.isLogged);
  const dispatch = useDispatch<AppDispatch>();

  useLayoutEffect(() => {
    const checkAuthAndFetchCart = async () => {
      try {
        if (isLogged) {
          await protect();
          dispatch(fetchCartData());
        } else {
          dispatch(cartActions.deleteCart());
        }
      } catch (error) {
        const e = error as AxiosError;
        if (e.response && e.response.status === 401) {
          dispatch(accountAction.logout());
        }
      }
    };

    checkAuthAndFetchCart();
  }, [isLogged, dispatch]);

  return (
    <>
      {isLogged && <StatusBar />}
      {isLogged && <BottomTabs />}
      {!isLogged && <AccountStack />}
    </>
  );
}
