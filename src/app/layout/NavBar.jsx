import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AppBar, Toolbar,Box, Button } from '@mui/material';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

export default function NavBar() {
    const { t} = useTranslation();
  return (
    <>
      {/* Material-UI AppBar */}
      <AppBar position="static" sx={{ backgroundColor: '#333' }}>
        <Toolbar>
          {/* Navigation Links */}
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

          {/* Language Switcher */}
          <LanguageSwitcher />
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box className="container-fluid w-75 mx-auto" sx={{ mt: 4 }}>
        <Outlet />
      </Box>
    </>
  );
}
