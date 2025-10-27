import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Box, Button, Typography } from '@mui/material'; // Import Typography
import LanguageSwitcher from '../../components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import keycloakInstance from './../../keycloak';
import { useKeycloak } from "@react-keycloak/web"; // Import useKeycloak

export default function NavBar() {
    const { t } = useTranslation();
    const { keycloak, initialized } = useKeycloak(); // Access keycloak from context

    const handleLogin = () => {
        if (initialized && !keycloak.authenticated) { // Check initialization
            keycloak.login();
        }
    };

    const handleLogout = () => {
       if (initialized && keycloak.authenticated) { // Check initialization
            keycloak.logout();
        }
    };


    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: '#333' }}>
                <Toolbar>
                    <Box sx={{ flexGrow: 1, display: 'flex', gap: '20px' }}>
                        <Button component={Link} to="/" sx={{ color: 'white', textTransform: 'none' }}>
                            {t('nav.home')}
                        </Button>
                        <Button component={Link} to="/customers" sx={{ color: 'white', textTransform: 'none' }}>
                            {t('nav.customers')}
                        </Button>
                        <Button component={Link} to="/products" sx={{ color: 'white', textTransform: 'none' }}>
                            {t('nav.products')}
                        </Button>
                    </Box>

                    <LanguageSwitcher />

                    {/* Improved Login/Logout */}
                    {initialized ? ( // Conditionally render buttons
                        keycloak.authenticated ? (
                            <Button
                                variant="contained" // Use a Material-UI button
                                color="secondary" // Use a color
                                onClick={handleLogout} // Use the new logout function
                                sx={{ ml: 2, textTransform: 'none' }} // Add some margin and remove default capitalization
                            >
                                {t('nav.logout')} {/* Use translation for logout text */}
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleLogin} // Use the new login function
                                sx={{ ml: 2, textTransform: 'none' }}
                            >
                                {t('nav.login')} {/* Use translation for login text */}
                            </Button>
                        )
                    ) : (
                        <Typography variant="body2" color="white" sx={{ ml: 2 }}>
                            {t('nav.loading')} {/* Display a message while initializing */}
                        </Typography>
                    )}

                </Toolbar>
            </AppBar>

            <Box className="container-fluid w-75 mx-auto" sx={{ mt: 4 }}>
                <Outlet />
            </Box>
        </>
    );
}