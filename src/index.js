// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import authentication from '@kdpw/msal-b2c-react';
import App from './App';

authentication.initialize({
    instance: 'https://aspb2ctenantv7.b2clogin.com/tfp/',
    tenant: 'aspb2ctenantv7.onmicrosoft.com',
    signInPolicy: 'B2C_1_SignUpSignIn',
    applicationId: '62473786-71dc-477d-a9b5-cf905930e4d3',
    cacheLocation: 'sessionStorage',
    scopes: ['profile', 'openid'],
    redirectUri: 'https://aspstorageaccountv2.z9.web.core.windows.net/',
    validateAuthority: false
});

authentication.run(() => {
    ReactDOM.render(<App />, document.getElementById('root'));
});