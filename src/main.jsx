import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Context from "./services/Context.jsx";
import { QueryClient, QueryClientProvider  } from '@tanstack/react-query';
import { BrowserRouter } from "react-router-dom/dist/index.js";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
  <BrowserRouter>
    <Context>
      <App />
      <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
    </Context>
  </BrowserRouter>
  
  </QueryClientProvider>
);
