"use client";

import API from "@/services/api";
import { createContext, useContext, useState } from "react";


interface AuthContextType {
  token: string | null;
  role: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    const res = await API.post("/auth/login", { email, password });

    const jwt = res.data.token;

    localStorage.setItem("token", jwt);

    setToken(jwt);

    const payload = JSON.parse(atob(jwt.split(".")[1]));

    setRole(payload.role);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;








