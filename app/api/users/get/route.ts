import { baseAPiURL } from '@/constants/urls';
import { makeGetRequest } from '@/utils/routes';
import { NextRequest } from 'next/server';

async function handler(req: NextRequest) {
    const url = `${baseAPiURL}/api/v1/user`;
  
    const data = await makeGetRequest(req, url);
    return new Response(JSON.stringify(data));
}

export {handler as GET};