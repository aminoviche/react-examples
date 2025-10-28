import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductList from '../products/ProductList';
import Customers from './../customers/Customers';
import Homepage from './../homePage/HomePage';
import NavBar from './../layout/NavBar';
import PrivateRoute from './PrivateRoute';
import LoginPage from './LoginPage';

import { ReactKeycloakProvider, useKeycloak } from "@react-keycloak/web";
import keycloakInstance from './../../keycloak';




export default function AppRoutes() {
    return (
        <ReactKeycloakProvider
            authClient={keycloakInstance} // Use the single instance
            initOptions={{ onLoad: 'login-required', pkceMethod: 'S256' }}
            onTokens={({ token }) => {
                if (token) {
                    localStorage.setItem("kc_token", token);
                }
            }}
        >
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/" element={<PrivateRoute><NavBar /></PrivateRoute>}>
                        <Route index element={<Homepage />} />
                        <Route path="customers" element={<PrivateRoute><Customers /></PrivateRoute>} />
                        <Route path="products" element={<PrivateRoute><ProductList /></PrivateRoute>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ReactKeycloakProvider>
    );
}

