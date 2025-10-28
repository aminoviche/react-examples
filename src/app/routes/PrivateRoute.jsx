import React, { useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';




const PrivateRoute = ({ children }) => {
    // const { keycloak, initialized } = useKeycloak();
    //
    // useEffect(() => {
    //     if (initialized && !keycloak.authenticated) {
    //         keycloak.login();
    //     }
    // }, [initialized, keycloak]);
    //
    // if (!initialized) {
    //     return <div>Loading...</div>; // Better loading indicator
    // }
    //
    // if (!keycloak.authenticated) {
    //     return <div>Authenticating...</div>; // Better indicator
    // }

    return children;
};

export default PrivateRoute;
