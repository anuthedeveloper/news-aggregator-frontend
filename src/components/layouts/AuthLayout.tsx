import React from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom"; // Outlet renders the nested route's element
import bgImage from "../../assets/wizard-city.jpg";
import { HOME_PATH } from "../../routes/path";

const AuthLayout: React.FC = () => {
  return (
    <div
      className="w-full h-screen bg-cover bg-center flex flex-col justify-between"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <header className="p-4">
        <h1 className="text-xl font-bold text-gray-600">
          <Link to={HOME_PATH.root}>News Aggregator</Link>
        </h1>
      </header>
      <main className="flex-grow flex items-center justify-center">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
