import type { ReactNode } from "react";
import { AuthProvider } from "./context/AuthContext";

export const AppProvider = ({ children }: { children: ReactNode }) => (
  <AuthProvider>
    {children}
  </AuthProvider>
);
