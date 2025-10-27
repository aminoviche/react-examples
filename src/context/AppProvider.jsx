import React, { createContext, useState } from 'react';


export const AppContext = createContext();
export const CurrentUserContext = createContext(null);

const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    theme: 'light',
  });

  const toggleTheme = () => {
    setState((prevState) => ({
      ...prevState,
      theme: prevState.theme === 'light' ? 'dark' : 'light',
    }));
  };

//   const handleKeycloakEvent = (event, error) => {
//     console.log('Keycloak event:', event, error);
//   };
//
//   const handleKeycloakTokens = (tokens) => {
//     console.log('Keycloak tokens:', tokens);
//   };

  return (
//     <ReactKeycloakProvider
//     authClient={keycloak}
//     onEvent={handleKeycloakEvent}
//     onTokens={handleKeycloakTokens}
//   >
    <AppContext.Provider value={{ state, setState, toggleTheme }}>
      {children}
    </AppContext.Provider>
//     </ReactKeycloakProvider>
  );
};

export default AppProvider;
