import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './i18n/i18n'; // Import i18n configuration

import AppRoutes from './app/routes/AppRoutes';


const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>

);
