import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';

export type UserRole = 'DOCTOR' | 'STAFF' | null;

interface AuthContextType {
  userRole: UserRole;
  login: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const segments = useSegments();
  const router = useRouter();

  const isAuthenticated = userRole !== null;

  const login = (role: UserRole) => {
    setUserRole(role);
    if (role === 'DOCTOR') {
      router.replace('/dashboard');
    } else if (role === 'STAFF') {
      router.replace('/staff' as any);
    }
  };

  const logout = () => {
    setUserRole(null);
    router.replace('/');
  };

  // Optional: Route protection logic could go here based on segments
  // but for a mocked demo, we rely on the manual login redirects.

  return (
    <AuthContext.Provider value={{ userRole, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
