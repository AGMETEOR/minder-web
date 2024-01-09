import { NextRequest } from 'next/server';
import { isEmpty } from '../general';

export async function makePostRequest(req: Request, url: string, body: any) {
    const requestOptions = {
      method: 'POST',
      headers: req.headers,
    } as RequestInit;

    if (!isEmpty(body)) {
      requestOptions.body = JSON.stringify(body);
    }
  
    const response = await fetch(url, requestOptions);
  
    const data = await response.json();
    return data;
  }

  export async function makeGetRequest(req: NextRequest, url: string) {  
    const requestOptions = {
      method: 'GET',
      headers: req.headers,
    } as RequestInit;
  
    const response = await fetch(url, requestOptions);
  
    const data = await response.json();
    return data;
  }