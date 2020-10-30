import React from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyles from "./styles/global";
import { AppStore } from "./stores";
import { Main } from "./components/Main";

function App() {
  return (
    <Provider store={AppStore}>
      <GlobalStyles />
      <ToastContainer autoClose={3000} />
      <Main />
    </Provider>
  );
}

export default App;
