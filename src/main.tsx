import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {BrowserRouter} from "react-router-dom";
import {AppRouter} from "@/router/components/AppRouter";

import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRouter />
      <ToastContainer />
    </BrowserRouter>
  </React.StrictMode>,
);
