import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../services/authService';
import { Article } from '../types';


const NewsFeed: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState({
    category: '',
    source: '',
    date: '',
  });

  const fetchArticles = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/articles', {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        params: {
          search: searchQuery,
          category: filter.category,
          source: filter.source,
          date: filter.date,
        },
      });
      setArticles(response.data.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [searchQuery, filter]);

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/preferences', {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        const prefs = response.data;
        setFilter((prev) => ({
          ...prev,
          category: prefs.categories,
          source: prefs.sources,
        }));
      } catch (error) {
        console.error('Error fetching preferences:', error);
      }
    };
    fetchPreferences();
    fetchArticles();
  }, []);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">News Feed</h1>
      
      {/* Search and Filters */}
      <div className="mb-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 border rounded-md w-full md:w-1/3"
        />

        <select
          name="category"
          value={filter.category}
          onChange={handleFilterChange}
          className="px-4 py-2 border rounded-md w-full md:w-1/3"
        >
          <option value="">All Categories</option>
          <option value="politics">Politics</option>
          <option value="technology">Technology</option>
          <option value="sports">Sports</option>
        </select>

        <select
          name="source"
          value={filter.source}
          onChange={handleFilterChange}
          className="px-4 py-2 border rounded-md w-full md:w-1/3"
        >
          <option value="">All Sources</option>
          <option value="bbc">BBC News</option>
          <option value="guardian">The Guardian</option>
          <option value="nyt">New York Times</option>
        </select>
      </div>

      {/* Articles List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition"
          >
            <h2 className="text-xl font-bold mb-2">{article.title}</h2>
            <p className="text-gray-600 mb-4">{article.description}</p>
            <div className="text-sm text-gray-500">
              <span>{article.source} | </span>
              <span>{new Date(article.published_at).toDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
