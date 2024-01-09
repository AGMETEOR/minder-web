import { baseAPiURL } from '@/constants/urls';
import { makePostRequest } from '@/utils/routes';
 
async function handler(req: Request) {
  const reqURL = `${baseAPiURL}/api/v1/profile`;
  try {
    const body = await req.json();
    const data = await makePostRequest(req, reqURL, body);
    return new Response(JSON.stringify(data));
  } catch (error) {
    console.error('Error in API route:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export {handler as POST};