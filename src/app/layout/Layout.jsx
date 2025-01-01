import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { MenuItem, Select } from '@mui/material';
import LanguageSwitcher from '../../components/LanguageSwitcher';


export default function Layout() {


  const navContainerStyle = {
    backgroundColor: '#333', // Dark background
    padding: '10px',
  };

  return (
    <>
      <nav
        style={navContainerStyle}
        className="navbar-dark nav justify-content-center"
      >
        <li className="nav-item">
          <Link to="/" className="nav-link text-light">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/customers" className="nav-link text-light">
            customers
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/products" className="nav-link text-light">
            products
          </Link>
        </li>
        <LanguageSwitcher/>
   
      </nav>

      <div className="container-fluid w-75 mx-auto">
        <Outlet />
      </div>
    </>
  );
}
