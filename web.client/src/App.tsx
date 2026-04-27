import React, { useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { createAppRouter } from './Routes/AppRoutes';
import { AppProvider } from './Contexts/AppContext';
import { AppThemeProvider } from './styles/ThemeProvider';


const App: React.FC = () => {
    // pozdeji dodelat prihlaseni a ulozeni tokenu do kontextu
    const [token, setToken] = useState<string>('');
    const [role, setRole] = useState<string>('');

    const handleLogin = (token: string, role: string) => {
        setToken(token);
        setRole(role);
    };

    // Vytvoříme instanci routeru
    const router = createAppRouter(token, role);

    console.log(import.meta.env.VITE_API_URL)
    return (
        <AppThemeProvider>
            <AppProvider>
                {/* 
                   RouterProvider nahrazuje BrowserRouter a Routes. 
                   Stará se o všechno routování na základě konfigurace v AppRoutes.ts 
                */}
                <RouterProvider router={router} />
            </AppProvider>
        </AppThemeProvider>
    );
};

export default App;