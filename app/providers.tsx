'use client';

import { AuthProvider } from '@/lib/context/AuthContext';
import { SongProvider } from '@/lib/context/SongContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <SongProvider>
        {children}
      </SongProvider>
    </AuthProvider>
  );
}