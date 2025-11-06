// src/utils/api.ts
import { ISong, IArtist } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
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

  const response = await fetch(`${API_BASE_URL}/songs?${params}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch songs: ${response.statusText}`);
  }

  return response.json();
};

export const fetchSongById = async (id: string): Promise<ApiResponse<ISong>> => {
  const response = await fetch(`${API_BASE_URL}/song/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch song: ${response.statusText}`);
  }

  return response.json();
};

export const fetchArtistById = async (id: string): Promise<ApiResponse<IArtist>> => {
  const response = await fetch(`${API_BASE_URL}/artist/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch artist: ${response.statusText}`);
  }

  return response.json();
};