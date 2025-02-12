import React, { createContext, useContext, useState, ReactNode } from "react";
import { login, logout, register, getToken } from "../services/authService";

interface AuthContextType {
  user: any;
  loginUser: (email: string, password: string) => Promise<void>;
  registerUser: (
    name: string,
    email: string,
    password: string,
    password_confirmation: string
  ) => Promise<void>;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);

  const loginUser = async (email: string, password: string) => {
    const loggedInUser = await login(email, password);
    setUser(loggedInUser);
  };

  const registerUser = async (
    name: string,
    email: string,
    password: string,
    password_confirmation: string
  ) => {
    const registeredUser = await register(
      name,
      email,
      password,
      password_confirmation
    );
    setUser(registeredUser);
  };

  const logoutUser = () => {
    logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, registerUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
