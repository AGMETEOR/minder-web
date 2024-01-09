export const baseUrl = process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : 'http://localhost:3000';

const isDev = process.env.NODE_ENV === 'development';

export const baseAuthURL = isDev ? 'http://localhost:8081' : 'https://auth.stacklok.com';
export const baseAPiURL = isDev ? 'http://localhost:8080' : 'https://api.stacklok.com';