import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Loader from "./components/ui/Loader.jsx";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <Suspense fallback={<Loader />}>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </Suspense>
);
