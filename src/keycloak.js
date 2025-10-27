import Keycloak from 'keycloak-js';

const keycloakInstance = new Keycloak({
    url: 'http://localhost:9098/',
    realm: 'micro-services',
    clientId: 'react-client',
});

export default keycloakInstance; // Make it available for use