import React, { StrictMode } from 'react';
import ReactDOM from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.css';
import './i18n/i18n'; // Import i18n configuration

import AppRoutes from './app/routes/AppRoutes';


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  //<StrictMode>
    <AppRoutes />
  //</StrictMode>

);
