import { baseAPiURL } from '@/constants/urls';
import { makeGetRequest } from '@/utils/routes';
import type { NextRequest } from 'next/server';

async function handler(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const projectId = searchParams.get('project_id');
  
    if (!projectId) {
      throw new Error('Project ID is required.');
    }
    
    const base = `${baseAPiURL}/api/v1/profiles?`;
    const urlWithParams = base + new URLSearchParams({
      'context.provider': 'github', // TODO: This will come from context or some sort of state
      'context.project_id': projectId,
    }).toString();
  
    const data = await makeGetRequest(req, urlWithParams);
    return new Response(JSON.stringify(data));
  } catch (error) {
    console.error('Error in Next.js route handler:', error);
    return new Response('Internal server error', {status: 500});
  }
}

export { handler as GET };