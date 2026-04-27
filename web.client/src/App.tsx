import React from 'react';
import { RouterProvider } from 'react-router/dom';
import { createAppRouter } from './Routes/AppRoutes';
import { AppProvider } from './Contexts/AppContext';
import { AppThemeProvider } from './styles/ThemeProvider';


const App: React.FC = () => {
    const token = '';
    const role = '';
    const router = createAppRouter(token, role);

    return (
        <AppThemeProvider>
            <AppProvider>
                <RouterProvider router={router} />
            </AppProvider>
        </AppThemeProvider>
    );
};

export default App;
