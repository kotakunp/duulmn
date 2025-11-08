import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Extract the path from the request URL
    const url = new URL(request.url);
    const path = url.pathname.replace('/api/proxy', ''); // Remove the proxy prefix
    const queryParams = url.searchParams.toString();
    
    // Backend API base URL
    const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:3001/api';
    
    // Construct the target URL
    let targetUrl = `${BACKEND_API_URL}${path}`;
    if (queryParams) {
      targetUrl += `?${queryParams}`;
    }
    
    // Forward the request to the backend
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...getRequestHeaders(request),
      },
    });
    
    // Return the response from the backend
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from backend' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Extract the path from the request URL
    const url = new URL(request.url);
    const path = url.pathname.replace('/api/proxy', ''); // Remove the proxy prefix
    const queryParams = url.searchParams.toString();
    
    // Backend API base URL
    const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:3001/api';
    
    // Get request body
    const body = await request.json();
    
    // Construct the target URL
    let targetUrl = `${BACKEND_API_URL}${path}`;
    if (queryParams) {
      targetUrl += `?${queryParams}`;
    }
    
    // Forward the request to the backend
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getRequestHeaders(request),
      },
      body: JSON.stringify(body),
    });
    
    // Return the response from the backend
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from backend' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Extract the path from the request URL
    const url = new URL(request.url);
    const path = url.pathname.replace('/api/proxy', ''); // Remove the proxy prefix
    const queryParams = url.searchParams.toString();
    
    // Backend API base URL
    const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:3001/api';
    
    // Get request body
    const body = await request.json();
    
    // Construct the target URL
    let targetUrl = `${BACKEND_API_URL}${path}`;
    if (queryParams) {
      targetUrl += `?${queryParams}`;
    }
    
    // Forward the request to the backend
    const response = await fetch(targetUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getRequestHeaders(request),
      },
      body: JSON.stringify(body),
    });
    
    // Return the response from the backend
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from backend' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Extract the path from the request URL
    const url = new URL(request.url);
    const path = url.pathname.replace('/api/proxy', ''); // Remove the proxy prefix
    const queryParams = url.searchParams.toString();
    
    // Backend API base URL
    const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:3001/api';
    
    // Construct the target URL
    let targetUrl = `${BACKEND_API_URL}${path}`;
    if (queryParams) {
      targetUrl += `?${queryParams}`;
    }
    
    // Forward the request to the backend
    const response = await fetch(targetUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...getRequestHeaders(request),
      },
    });
    
    // Return the response from the backend
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from backend' },
      { status: 500 }
    );
  }
}

// Helper function to get headers from the original request
function getRequestHeaders(request: NextRequest): Record<string, string> {
  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    // Only forward certain headers to avoid conflicts
    if (
      key.toLowerCase().startsWith('x-') || 
      key.toLowerCase() === 'authorization' ||
      key.toLowerCase() === 'content-type' ||
      key.toLowerCase() === 'user-agent' ||
      key.toLowerCase() === 'accept' ||
      key.toLowerCase() === 'accept-encoding' ||
      key.toLowerCase() === 'accept-language'
    ) {
      headers[key] = value;
    }
  });
  return headers;
}