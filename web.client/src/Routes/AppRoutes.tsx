import { lazy, Suspense, type ReactNode } from 'react';
import { createBrowserRouter } from 'react-router';

import MainLayout from '../Layout/MainLayout';
import ProtectedRoute from '../Auth/ProtectedRoute';

import HomePage from '../Pages/HomePage/HomePage';
import LoginPage from '../Pages/LoginPage';
import DashboardPage from '../Pages/DashboardPage';
import AdminPage from '../Pages/AdminPage';
import FrontedServicePage from '../Pages/ServicesPages/FrontedServicePage';
import GameAnd3DGraphicsPage from '../Pages/ServicesPages/GameAnd3DGraphicsPage';
import BackendAndSystemsPage from '../Pages/ServicesPages/BackendAndSystemsPage';
import Page404 from '../Pages/404Page';
import UXUIServicePage from '../Pages/ServicesPages/UXUIServicePage';
import Consulting from '../Pages/ServicesPages/Consulting';
import ServicePage from '../Pages/ServicesPages/ServicePage';

const DevOsRoute = lazy(() => import('./DevOsRoute'));

const withSuspense = (children: ReactNode) => (
    <Suspense fallback={<div />}>{children}</Suspense>
);

export const createAppRouter = (token: string | null, role: string | null) => createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            { path: "/", element: <HomePage /> },
            { path: "/dashboard", element: <DashboardPage /> },
            { path: "/Services", element: <ServicePage /> },
            { path: "/Services/FrontendDevelopment", element: <FrontedServicePage /> },
            { path: "/Services/GameAnd3DGraphics", element: <GameAnd3DGraphicsPage /> },
            { path: "/Services/BackendAndSystems", element: <BackendAndSystemsPage /> },
            { path: "/Services/UXUIDesign", element: <UXUIServicePage /> },
            { path: "/Services/Consulting", element: <Consulting /> },
        ]
    },
    
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/DevOs",
        element: withSuspense(<DevOsRoute />)
    },
    {
        path: "/admin",
        element: (
             <ProtectedRoute token={token} role={role} requiredRole="admin">
                <AdminPage />
             </ProtectedRoute>
        )
    },
    
    {
        path: "*",
        element: <Page404 />
    }
]);
