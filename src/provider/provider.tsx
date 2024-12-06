import React, { createContext, ReactNode, useContext } from "react";

// Define la estructura de los datos del contexto
interface ContextData {
  user: string | null; 
}

const defaultContextData: ContextData = {
  user: null,
};

// Crea el contexto con el tipo adecuado
export const context = createContext<ContextData>(defaultContextData);

// Define el tipo de las propiedades del proveedor
interface ProviderProps {
  children: ReactNode; 
}

// Implementa el proveedor con el tipado
export const provider: React.FC<ProviderProps> = ({ children }) => {
  const data: ContextData = {
    user: JSON.parse(localStorage.getItem("user") || "null"),
  };

  return <context.Provider value={data}>{children}</context.Provider>;
};

export const useUserContext = () => useContext(context);
