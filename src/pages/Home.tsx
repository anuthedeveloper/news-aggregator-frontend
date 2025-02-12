import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-white shadow-md">
        <nav className="container mx-auto flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold text-indigo-600">News Aggregator</h1>
          <div className="space-x-4">
            <Link to="/login" className="text-gray-600 hover:text-indigo-600">Login</Link>
            <Link to="/register" className="text-gray-600 hover:text-indigo-600">Register</Link>
            <Link to="/news" className="text-gray-600 hover:text-indigo-600">News Feed</Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto flex flex-col items-center justify-center text-center py-20">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">
          Stay Informed with the Latest News
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Get news from trusted sources and personalize your feed.
        </p>
        <Link 
          to="/news"
          className="px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
        >
          Explore News
        </Link>
      </main>

      <footer className="bg-gray-800 text-gray-400 py-4">
        <p className="text-center">
          © {new Date().getFullYear()} News Aggregator. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
