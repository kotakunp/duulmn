// src/contexts/SongContext.tsx
'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { ISong } from '../types';

type SongAction =
  | { type: 'SET_SONGS'; payload: ISong[] }
  | { type: 'ADD_SONG'; payload: ISong }
  | { type: 'UPDATE_SONG'; payload: ISong }
  | { type: 'DELETE_SONG'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

interface SongState {
  songs: ISong[];
  loading: boolean;
  error: string | null;
}

const initialState: SongState = {
  songs: [],
  loading: false,
  error: null,
};

const SongContext = createContext<{
  state: SongState;
  dispatch: React.Dispatch<SongAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const songReducer = (state: SongState, action: SongAction): SongState => {
  switch (action.type) {
    case 'SET_SONGS':
      return { ...state, songs: action.payload };
    case 'ADD_SONG':
      return { ...state, songs: [...state.songs, action.payload] };
    case 'UPDATE_SONG':
      return {
        ...state,
        songs: state.songs.map(song =>
          song._id === action.payload._id ? action.payload : song
        ),
      };
    case 'DELETE_SONG':
      return {
        ...state,
        songs: state.songs.filter(song => song._id !== action.payload),
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const SongProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(songReducer, initialState);

  return (
    <SongContext.Provider value={{ state, dispatch }}>
      {children}
    </SongContext.Provider>
  );
};

export const useSongContext = () => {
  const context = useContext(SongContext);
  if (!context) {
    throw new Error('useSongContext must be used within a SongProvider');
  }
  return context;
};