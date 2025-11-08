import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    
    // Backend API base URL
    const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:3001';
    
    // Forward the request to the backend
    const response = await fetch(`${BACKEND_API_URL}/api/song/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...await getRequestHeaders(),
      },
    });
    
    // Return the response from the backend
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Song API proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch song from backend' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    
    // Get request body
    const body = await request.json();
    
    // Backend API base URL
    const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:3001';
    
    // Forward the request to the backend
    const response = await fetch(`${BACKEND_API_URL}/api/song/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...await getRequestHeaders(),
      },
      body: JSON.stringify(body),
    });
    
    // Return the response from the backend
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Song API proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to update song on backend' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    
    // Backend API base URL
    const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:3001';
    
    // Forward the request to the backend
    const response = await fetch(`${BACKEND_API_URL}/api/song/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...await getRequestHeaders(),
      },
    });
    
    // Return the response from the backend
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Song API proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to delete song from backend' },
      { status: 500 }
    );
  }
}

// Helper function to get headers
async function getRequestHeaders(): Promise<Record<string, string>> {
  const nextHeaders = await headers();
  
  const headersObj: Record<string, string> = {};
  nextHeaders.forEach((value, key) => {
    // Only forward certain headers to avoid conflicts
    if (
      key.toLowerCase().startsWith('x-') || 
      key.toLowerCase() === 'authorization' ||
      key.toLowerCase() === 'content-type' ||
      key.toLowerCase() === 'user-agent'
    ) {
      headersObj[key] = value;
    }
  });
  return headersObj;
}