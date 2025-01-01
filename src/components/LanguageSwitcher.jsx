import React from 'react';
import { Select, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Select
      value={i18n.language}
      onChange={handleChange}
      sx={{
        color: 'white',
        '& .MuiSvgIcon-root': { color: 'white' }, // Ensures dropdown arrow matches text color
      }}
      variant="standard"
      disableUnderline
    >
      <MenuItem value="en">English</MenuItem>
      <MenuItem value="fr">Français</MenuItem>
    </Select>
  );
};

export default LanguageSwitcher;
