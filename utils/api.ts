// src/utils/api.ts
import { ISong, IArtist } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Utility function to safely get token from localStorage
const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp?: string;
}

export const fetchSongs = async (
  limit: number = 20,
  offset: number = 0,
  search?: string,
  genre?: string
): Promise<ApiResponse<{ songs: ISong[]; total: number; limit: number; offset: number }>> => {
  const params = new URLSearchParams({
    limit: limit.toString(),
    offset: offset.toString(),
  });

  if (search) params.append('search', search);
  if (genre) params.append('genre', genre);

  try {
    // Use Next.js proxy route instead of direct API call to avoid CORS issues
    const response = await fetch(`/api/proxy/songs?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch songs: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    // If proxy fails, fallback to direct API call
    if (error instanceof Error && error.message.includes('Failed to fetch')) {
      // Try the original API endpoint as fallback
      const fallbackResponse = await fetch(`${API_BASE_URL}/songs?${params}`);
      
      if (!fallbackResponse.ok) {
        throw new Error(`Failed to fetch songs: ${fallbackResponse.statusText}`);
      }
      
      return await fallbackResponse.json();
    } else {
      throw error;
    }
  }
};

export const fetchSongById = async (id: string): Promise<ApiResponse<ISong>> => {
  try {
    const response = await fetch(`/api/proxy/song/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch song: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    // If proxy fails, fallback to direct API call
    if (error instanceof Error && error.message.includes('Failed to fetch')) {
      const fallbackResponse = await fetch(`${API_BASE_URL}/song/${id}`);
      
      if (!fallbackResponse.ok) {
        throw new Error(`Failed to fetch song: ${fallbackResponse.statusText}`);
      }
      
      return await fallbackResponse.json();
    } else {
      throw error;
    }
  }
};

export const fetchArtistById = async (id: string): Promise<ApiResponse<IArtist>> => {
  try {
    const response = await fetch(`/api/proxy/artist/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch artist: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    // If proxy fails, fallback to direct API call
    if (error instanceof Error && error.message.includes('Failed to fetch')) {
      const fallbackResponse = await fetch(`${API_BASE_URL}/artist/${id}`);
      
      if (!fallbackResponse.ok) {
        throw new Error(`Failed to fetch artist: ${fallbackResponse.statusText}`);
      }
      
      return await fallbackResponse.json();
    } else {
      throw error;
    }
  }
};

// Authentication interfaces
interface User {
  _id: string;
  email: string;
  username: string;
  profileImage?: string;
  role: 'user' | 'admin' | 'artist';
  isPremium: boolean;
  createdAt: string;
  updatedAt?: string;
}

interface AuthResponse {
  success: boolean;
  data: User;
  token: string;
  message: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupData {
  email: string;
  username: string;
  password: string;
}

// Authentication APIs
export const signup = async (userData: SignupData): Promise<AuthResponse> => {
  try {
    const response = await fetch(`/api/proxy/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to sign up');
    }

    return await response.json();
  } catch (error) {
    // If proxy fails, fallback to direct API call
    if (error instanceof Error && error.message.includes('Failed to fetch')) {
      const fallbackResponse = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!fallbackResponse.ok) {
        const errorData = await fallbackResponse.json();
        throw new Error(errorData.message || 'Failed to sign up');
      }

      return await fallbackResponse.json();
    } else {
      throw error;
    }
  }
};

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await fetch(`/api/proxy/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to log in');
    }

    return await response.json();
  } catch (error) {
    // If proxy fails, fallback to direct API call
    if (error instanceof Error && error.message.includes('Failed to fetch')) {
      const fallbackResponse = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!fallbackResponse.ok) {
        const errorData = await fallbackResponse.json();
        throw new Error(errorData.message || 'Failed to log in');
      }

      return await fallbackResponse.json();
    } else {
      throw error;
    }
  }
};

export const logout = async (): Promise<ApiResponse<null>> => {
  const token = getToken();
  
  // Check if token exists
  if (!token) {
    throw new Error('No authentication token found');
  }
  
  try {
    const response = await fetch(`/api/proxy/auth/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to log out');
    }

    // Remove token from localStorage after logout
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    
    return await response.json();
  } catch (error) {
    // If proxy fails, fallback to direct API call
    if (error instanceof Error && error.message.includes('Failed to fetch')) {
      const fallbackResponse = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!fallbackResponse.ok) {
        const errorData = await fallbackResponse.json();
        throw new Error(errorData.message || 'Failed to log out');
      }

      // Remove token from localStorage after logout
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
      
      return await fallbackResponse.json();
    } else {
      throw error;
    }
  }
};

export const fetchProfile = async (): Promise<ApiResponse<User>> => {
  const token = getToken();
  
  // Check if token exists
  if (!token) {
    throw new Error('No authentication token found');
  }
  
  try {
    const response = await fetch(`/api/proxy/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch profile');
    }

    return await response.json();
  } catch (error) {
    // If proxy fails, fallback to direct API call
    if (error instanceof Error && error.message.includes('Failed to fetch')) {
      const fallbackResponse = await fetch(`${API_BASE_URL}/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!fallbackResponse.ok) {
        const errorData = await fallbackResponse.json();
        throw new Error(errorData.message || 'Failed to fetch profile');
      }

      return await fallbackResponse.json();
    } else {
      throw error;
    }
  }
};