import { baseAPiURL } from '@/constants/urls';
import { makePostRequest } from '@/utils/routes';
 
async function handler(req: Request) {
  const reqURL = `${baseAPiURL}/api/v1/user`;
    const data = await makePostRequest(req, reqURL, {});
    return new Response(JSON.stringify(data));
}

export {handler as POST};