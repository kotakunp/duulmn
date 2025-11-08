import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Extract query parameters from the request URL
    const url = new URL(request.url);
    const queryParams = url.searchParams.toString();
    
    // Backend API base URL
    const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:3001';
    
    // Construct the target URL
    let targetUrl = `${BACKEND_API_URL}/api/songs`;
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
    console.error('Songs API proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch songs from backend' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Backend API base URL
    const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:3001';
    
    // Get request body
    const body = await request.json();
    
    // Forward the request to the backend
    const response = await fetch(`${BACKEND_API_URL}/api/songs`, {
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
    console.error('Songs API proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to post song to backend' },
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
      key.toLowerCase() === 'user-agent'
    ) {
      headers[key] = value;
    }
  });
  return headers;
}