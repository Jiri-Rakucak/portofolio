import React from 'react';
import { Navigate } from 'react-router';

interface ProtectedRouteProps {
  token: string | null;
  role: string | null;
  requiredRole?: string;
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ token, role, requiredRole, children }) => {
  // Podmínka 1: Je uživatel vůbec přihlášen?
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Podmínka 2: Je vyžadována specifická role a má ji uživatel?
  if (requiredRole && role !== requiredRole) {
    // Uživatel nemá oprávnění, přesměrujeme ho na hlavní stránku.
    return <Navigate to="/" replace />;
  }

  // Vše je v pořádku, zobrazíme požadovaný obsah.
  return children;
};

export default ProtectedRoute;