// src/types/index.ts
export interface ISong {
  _id: string;
  title: string;
  artist: string;
  artistId?: string;
  album?: string;
  duration: string; // Format: MM:SS
  genre?: string;
  lyrics?: string;
  coverImage?: string;
  filePath?: string;
  plays: number;
  likes: number;
  language?: string;
  lyricsSync?: { time: number; text: string }[];
  createdAt: string;
  updatedAt: string;
}

export interface IArtist {
  _id: string;
  name: string;
  bio?: string;
  profileImage?: string;
  verified: boolean;
  followers: number;
  tracks: number;
  albums: number;
  createdAt: string;
  updatedAt: string;
}