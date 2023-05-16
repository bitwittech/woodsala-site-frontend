import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import Context from "./store/Context";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";

// Redux Setup
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"; // for persisting data
import { store, persistor } from "./Redux/store";

// subscribe

// subscribe this function is used for console the current state if there is no Redux extension there
// store.subscribe(() => console.log(store.getState()));

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);
