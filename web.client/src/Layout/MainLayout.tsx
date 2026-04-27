import React from 'react';
import { Outlet, Link, ScrollRestoration } from 'react-router-dom';
import Footer from '../Components/Shared/Footer'; 
import Header from '../Components/Shared/Header';
const MainLayout: React.FC = () => {
  return (
    <div>
      <ScrollRestoration />
      <Header />
      <main>
        {/* Zde se vykreslí obsah podřazené routy (HomePage, DashboardPage, atd.) */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout; 