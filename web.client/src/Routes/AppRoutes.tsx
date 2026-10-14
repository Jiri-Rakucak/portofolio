import { lazy, Suspense, type ReactNode } from "react";
import { createBrowserRouter, Navigate, type RouteObject } from "react-router";

import MainLayout from "../Layout/MainLayout";
import MetadataLayout from "../Layout/MetadataLayout";
import { metadataHandle } from "../metadata/pageMetadata";
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

const serviceRoute = (path: string, serviceId: string): RouteObject => ({
  path,
  element: <ServiceDetailPage serviceId={serviceId} />,
  handle: metadataHandle({ kind: 'service', serviceId }),
});

export const createAppRouter = (token: string | null, role: string | null) =>
  createBrowserRouter([
    {
      element: <MetadataLayout />,
      children: [
        {
          element: <MainLayout />,
          children: [
            { path: "/", element: <HomePage />, handle: metadataHandle({ kind: 'home' }) },
            { path: "/projects", element: <ProjectsPage />, handle: metadataHandle({ kind: 'projects' }) },
            {
              path: "/projects/:projectId",
              element: <ProjectDetailPage />,
              handle: metadataHandle({ kind: 'project' }),
            },
            {
              path: "/projects/atom-scene",
              element: <Navigate to="/projects/devos-portfolio" replace />,
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
            { path: "/services", element: <ServicePage />, handle: metadataHandle({ kind: 'services' }) },
            serviceRoute("/services/frontend-development", "frontend-development"),
            serviceRoute("/services/game-and-3d-graphics", "game-and-3d-graphics"),
            serviceRoute("/services/backend-and-systems", "backend-and-systems"),
            serviceRoute("/services/ux-ui-design", "ui-ux-design"),
            serviceRoute("/services/consulting", "consulting"),
            { path: "*", element: <Page404 />, handle: metadataHandle({ kind: 'notFound' }) },
          ],
        },

        {
          path: "/login",
          element: <LoginPage />,
          handle: metadataHandle({ kind: 'login' }),
        },
        {
          path: "/DevOs",
          caseSensitive: true,
          element: <Navigate to="/devos" replace />,
        },
        {
          path: "/devos",
          element: withSuspense(<DevOsRoute />),
          handle: metadataHandle({ kind: 'devos' }),
        },
        {
          path: "/admin",
          handle: metadataHandle({ kind: 'admin' }),
          element: (
            <ProtectedRoute token={token} role={role} requiredRole="admin">
              <AdminPage />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);
