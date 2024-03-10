import e from 'express';
import { auth } from 'express-oauth2-jwt-bearer';

export const checkToken: e.Handler = auth({
    // issuerBaseURL: process.env.A_DOMAIN,
    issuerBaseURL: 'https://dev-3f45fsqiwdpfl2ds.us.auth0.com',
    audience: 'https://roadrunners-api/',
    tokenSigningAlg: 'RS256'
});