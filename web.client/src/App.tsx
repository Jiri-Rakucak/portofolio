import React from 'react';
import { RouterProvider } from 'react-router/dom';
import { createAppRouter } from './Routes/AppRoutes';
import { AppThemeProvider } from './styles/ThemeProvider';
import { LanguageProvider } from './i18n/LanguageProvider';


const App: React.FC = () => {
    const token = '';
    const role = '';
    const router = createAppRouter(token, role);

    return (
        <AppThemeProvider>
            <LanguageProvider>
                <RouterProvider router={router} />
            </LanguageProvider>
        </AppThemeProvider>
    );
};

export default App;
