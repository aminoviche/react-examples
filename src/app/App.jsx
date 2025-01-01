import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductList from './store/ProductList';
import Customers from './customers/Customers';
import Layout from './layout/Layout';
import Homepage from './homePage/HomePage';
import NavBar from './layout/NavBar';

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