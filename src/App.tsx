import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewsFeed from "./pages/NewsFeed";
import ProtectedRoute from "./components/ProtectedRoute";
import UserPreferences from "./pages/UserPreferences";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/news"
          element={
            <ProtectedRoute>
              <NewsFeed />
            </ProtectedRoute>
          }
        />
        <Route
          path="/preferences"
          element={
            <ProtectedRoute>
              <UserPreferences />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
