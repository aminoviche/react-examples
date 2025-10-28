import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductList from './products/ProductList';
import Customers from './customers/Customers';
import Layout from './layout/Layout';
import Homepage from './layout/HomePage';
import NavBar from './layout/NavBar';
import { httpClient } from './HttpClient';

// import Keycloak from 'keycloak-js';
//
// /*
//   Init Options
// */
// let initOptions = {
//   url: 'http://localhost:9098/',
//   realm: 'micro-services',
//   clientId: 'react-client',
// }
//
// let kc = new Keycloak(initOptions);
//
// kc.init({
//   onLoad: 'login-required', // Supported values: 'check-sso' , 'login-required'
//   checkLoginIframe: true,
//   pkceMethod: 'S256'
// }).then((auth) => {
//   if (!auth) {
//     window.location.reload();
//   } else {
//     /* Remove below logs if you are using this on production */
//     console.info("Authenticated");
//     console.log('auth', auth)
//     console.log('Keycloak', kc)
//     console.log('Access Token', kc.token)
//
//     /* http client will use this header in every request it sends */
//     httpClient.defaults.headers.common['Authorization'] = `Bearer ${kc.token}`;
//
//     kc.onTokenExpired = () => {
//       console.log('token expired')
//     }
//   }
// }, () => {
//   /* Notify the user if necessary */
//   console.error("Authentication Failed");
// });

export default function App() {
    return (

      <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Homepage />} />
          <Route path="customers" element={<Customers />} />
          <Route path="products" element={<ProductList />} />
   
        </Route>
      </Routes>
    </BrowserRouter>
    );
}