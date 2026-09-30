import { lazy, Suspense, type ReactNode } from "react";
import { createBrowserRouter, Navigate } from "react-router";

import MainLayout from "../Layout/MainLayout";
import ProtectedRoute from "../Auth/ProtectedRoute";

import HomePage from "../Pages/HomePage/HomePage";
import LoginPage from "../Pages/LoginPage";
import AdminPage from "../Pages/AdminPage";
import Page404 from "../Pages/404Page";
import ProjectsPage from "../Pages/ProjectsPage";
import ProjectDetailPage from "../Pages/ProjectsPages/ProjectDetailPage";
import ServicePage from "../Pages/ServicesPages/ServicePage";
import ServiceDetailPage from "../Pages/ServicesPages/ServiceDetailPage";

const DevOsRoute = lazy(() => import("./DevOsRoute"));

const withSuspense = (children: ReactNode) => (
  <Suspense fallback={<div />}>{children}</Suspense>
);

export const createAppRouter = (token: string | null, role: string | null) =>
  createBrowserRouter([
    {
      element: <MainLayout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/projects", element: <ProjectsPage /> },
        {
          path: "/projects/devos-portfolio",
          element: <ProjectDetailPage projectId="devos-portfolio" />,
        },
        {
          path: "/projects/ragsystem",
          element: <ProjectDetailPage projectId="ragsystem" />,
        },
        {
          path: "/projects/atom-scene",
          element: <Navigate to="/projects/ragsystem" replace />,
        },
        {
          path: "/projects/service-pages",
          element: <ProjectDetailPage projectId="service-pages" />,
        },
        {
          path: "/projects/unity-graduation-game",
          element: <ProjectDetailPage projectId="unity-graduation-game" />,
        },
        {
          path: "/Services",
          caseSensitive: true,
          element: <Navigate to="/services" replace />,
        },
        {
          path: "/Services/FrontendDevelopment",
          caseSensitive: true,
          element: <Navigate to="/services/frontend-development" replace />,
        },
        {
          path: "/Services/GameAnd3DGraphics",
          caseSensitive: true,
          element: <Navigate to="/services/game-and-3d-graphics" replace />,
        },
        {
          path: "/Services/BackendAndSystems",
          caseSensitive: true,
          element: <Navigate to="/services/backend-and-systems" replace />,
        },
        {
          path: "/Services/UXUIDesign",
          caseSensitive: true,
          element: <Navigate to="/services/ux-ui-design" replace />,
        },
        {
          path: "/Services/Consulting",
          caseSensitive: true,
          element: <Navigate to="/services/consulting" replace />,
        },
        { path: "/services", element: <ServicePage /> },
        {
          path: "/services/frontend-development",
          element: <ServiceDetailPage serviceId="frontend-development" />,
        },
        {
          path: "/services/game-and-3d-graphics",
          element: <ServiceDetailPage serviceId="game-and-3d-graphics" />,
        },
        {
          path: "/services/backend-and-systems",
          element: <ServiceDetailPage serviceId="backend-and-systems" />,
        },
        {
          path: "/services/ux-ui-design",
          element: <ServiceDetailPage serviceId="ui-ux-design" />,
        },
        {
          path: "/services/consulting",
          element: <ServiceDetailPage serviceId="consulting" />,
        },
      ],
    },

    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/DevOs",
      caseSensitive: true,
      element: <Navigate to="/devos" replace />,
    },
    {
      path: "/devos",
      element: withSuspense(<DevOsRoute />),
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute token={token} role={role} requiredRole="admin">
          <AdminPage />
        </ProtectedRoute>
      ),
    },

    {
      path: "*",
      element: <Page404 />,
    },
  ]);
