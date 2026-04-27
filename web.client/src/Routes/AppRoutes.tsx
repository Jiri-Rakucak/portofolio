import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Layouty a komponenty
import MainLayout from '../Layout/MainLayout';
import ProtectedRoute from '../Auth/ProtectedRoute';
import { DevOsProvider } from '../Contexts/DevOsContext';

// Import stránek
import HomePage from '../Pages/HomePage/HomePage';
import LoginPage from '../Pages/LoginPage';
import DashboardPage from '../Pages/DashboardPage';
import AdminPage from '../Pages/AdminPage';
import UIRender from '../Components/DevOS/UIRender';
import FrontedServicePage from '../Pages/ServicesPages/FrontedServicePage';
import GameAnd3DGraphicsPage from '../Pages/ServicesPages/GameAnd3DGraphicsPage';
import BackendAndSystemsPage from '../Pages/ServicesPages/BackendAndSystemsPage';
import Page404 from '../Pages/404Page';
import UXUIServicePage from '../Pages/ServicesPages/UXUIServicePage';
import Consulting from '../Pages/ServicesPages/Consulting';
import ServicePage from '../Pages/ServicesPages/ServicePage';

// Definice routeru jako funkce, která přijme auth props (pokud je budete v budoucnu potřebovat pro loaders)
export const createAppRouter = (token: string | null, role: string | null) => createBrowserRouter([
    {
        // Cesty s hlavním layoutem
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
    
    // Cesty bez hlavního layoutu
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/DevOs",
        element: (
            <DevOsProvider>
                <UIRender />
            </DevOsProvider>
        )
    },
    {
        path: "/admin",
        // Zde ukázka ochrané logiky přímo v elementu
        element: (
             <ProtectedRoute token={token} role={role} requiredRole="admin">
                <AdminPage />
             </ProtectedRoute>
        )
    },
    
    // 404 stránka
    {
        path: "*",
        element: <Page404 />
    }
]);