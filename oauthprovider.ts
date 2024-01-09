import { Provider } from 'next-auth/providers/index';
import { baseAuthURL, baseUrl } from './constants/urls';

export const providerID = 'custom-stacklok-provider-id';
const providerName = 'custom-stacklok-provider-name';
export const clientId = 'minder-cli'; //TODO(allan): investigate use of minder-web
export const clientSecret = '';
const authorizationURL = `${baseAuthURL}/realms/stacklok/protocol/openid-connect/auth`;
export const tokenURL = `${baseAuthURL}/realms/stacklok/protocol/openid-connect/token`;
const issuerURL = `${baseAuthURL}/realms/stacklok`;
const jwksURL = `${baseAuthURL}/realms/stacklok/protocol/openid-connect/certs`;

const StacklokProvider = <Provider>{
    id: providerID,
    name: providerName,
    type: 'oauth',
    authorization: {
          url: authorizationURL,
          params: { scope: 'openid' },
      },
    checks: ['pkce'],
    idToken: true,
    token: tokenURL,
    options: { clientId, clientSecret },
    issuer: issuerURL,
    jwks_endpoint: jwksURL,
    profile(profile) {
        return {id: profile.sub, ...profile}
      },
};

export default StacklokProvider;