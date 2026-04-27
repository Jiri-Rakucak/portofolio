import React from 'react';
import { Outlet, ScrollRestoration } from 'react-router';
import Footer from '../Components/Shared/Footer'; 
import Header from '../Components/Shared/Header';

const MainLayout: React.FC = () => {
  return (
    <div>
      <ScrollRestoration />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout; 
