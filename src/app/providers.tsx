'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import { SongProvider } from '@/contexts/SongContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <SongProvider>
        {children}
      </SongProvider>
    </AuthProvider>
  );
}