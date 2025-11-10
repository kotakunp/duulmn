import { NextRequest, NextResponse } from 'next/server';

// Define API routes that should be proxied to the backend
const PROXY_ROUTES = ['/api/songs', '/api/song/', '/api/artist/', '/api/auth'];

export function proxy(request: NextRequest) {
  const url = new URL(request.url);
  
  // Check if the request path matches any of the proxy routes
  const shouldProxy = PROXY_ROUTES.some(route => 
    url.pathname === route || url.pathname.startsWith(route + '/')
  );

  if (shouldProxy) {
    // Backend API base URL
    const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:3001';
    
    // Remove the /api prefix from the pathname
    let backendPath = url.pathname.replace('/api', '');
    
    // Make sure path starts with a slash
    if (!backendPath.startsWith('/')) {
      backendPath = '/' + backendPath;
    }
    
    // Construct the target URL
    let targetUrl = `${BACKEND_API_URL}/api${backendPath}`;
    if (url.search) {
      targetUrl += url.search;
    }
    
    // Return a response that tells Next.js to proxy this request
    // Actually, we need to make the request directly in proxy
    return fetchBackend(request, targetUrl);
  }
  
  // For non-proxy routes, continue with normal processing
  return NextResponse.next();
}

async function fetchBackend(request: NextRequest, targetUrl: string) {
  // Get the request body if it exists
  let body: BodyInit | null = null;
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    body = await request.text();
  }

  // Make the request to the backend
  const backendResponse = await fetch(targetUrl, {
    method: request.method,
    headers: {
      'Content-Type': 'application/json',
      ...getObjectFromHeaders(request.headers),
    },
    body: body,
  });

  // Get the response data
  const data = await backendResponse.json();
  
  // Return the response from the backend
  return NextResponse.json(data, {
    status: backendResponse.status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// Helper function to convert Headers to a simple object
function getObjectFromHeaders(headers: Headers): Record<string, string> {
  const obj: Record<string, string> = {};
  headers.forEach((value, key) => {
    // Only forward certain headers to avoid conflicts
    if (
      key.toLowerCase().startsWith('x-') || 
      key.toLowerCase() === 'authorization' ||
      key.toLowerCase() === 'content-type' ||
      key.toLowerCase() === 'user-agent' ||
      key.toLowerCase() === 'accept'
    ) {
      obj[key] = value;
    }
  });
  return obj;
}

// Export the config to specify which paths the proxy should run on
export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - public files (_next, images, etc.)
     * - API routes that should not be proxied
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};