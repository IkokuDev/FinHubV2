'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type {FC} from 'react';

type UserRole = 'provider' | 'customer' | null;

interface AuthContextType {
  userRole: UserRole;
  login: (role: 'provider' | 'customer') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{children: ReactNode}> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>(null);

  const login = (role: 'provider' | 'customer') => {
    setUserRole(role);
  };

  const logout = () => {
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ userRole, login, logout }}>
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
