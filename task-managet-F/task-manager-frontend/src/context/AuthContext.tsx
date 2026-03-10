"use client";

import API from "@/services/api";
import { Task } from "@/types/task";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";


interface AuthContextType {
  token: string | null;
  role: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchTasks: () => Promise<void>;
  tasks: Task[];
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string) => {
  const res = await API.post("/auth/login", { email, password });


  const jwt = res.data.token;
  const role = res.data.role;

  localStorage.setItem("token", jwt);
  localStorage.setItem("role", role);

  setToken(jwt);
  setRole(role);

  console.log(role);
  };
  

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data.content);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setRole(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout,fetchTasks ,tasks,loading}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;








