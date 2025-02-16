import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const MainLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="py-8">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
