"use client";

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";

interface AuthContextType {
  token: string | null;
  setAuthToken: (token: string) => void;
  clearAuthToken: () => void;
  isInitialized: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize token from sessionStorage
  useEffect(() => {
    const storedToken = window.sessionStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    setIsInitialized(true);
  }, []);

  const setAuthToken = useCallback((newToken: string) => {
    setToken(newToken);
    window.sessionStorage.setItem("token", newToken);
  }, []);

  const clearAuthToken = useCallback(() => {
    setToken(null);
    window.sessionStorage.removeItem("token");
  }, []);

  return (
    <AuthContext.Provider value={{ token, setAuthToken, clearAuthToken, isInitialized }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}