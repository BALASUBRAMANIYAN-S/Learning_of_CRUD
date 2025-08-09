import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { PrimeReactProvider } from "primereact/api";
import { ToastContainer } from "react-toastify";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { ConfirmDialog } from "primereact/confirmdialog";

createRoot(document.getElementById("root")).render(
  <PrimeReactProvider>
    <Provider store={store}>
      <App />
    </Provider>
    <ToastContainer />
    <ConfirmDialog  />
  </PrimeReactProvider>
);
