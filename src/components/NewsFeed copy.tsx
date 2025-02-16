import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { getToken } from "../services/authService";
import { Article } from "../types/article";

const NewsFeed: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState({
    category: "",
    source: "",
    keyword: "",
  });

  const observer = useRef<IntersectionObserver | null>(null);
  const lastArticleRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/articles", {
        params: {
          page,
          category: filter.category,
          source: filter.source,
          keyword: filter.keyword,
        },
      });
      const newArticles = response.data.data;
      setArticles((prev) => [...prev, ...newArticles]);
      setHasMore(response.data.next_page_url !== null);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [page, fetchArticles]);

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/preferences",
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );
        const prefs = response.data;
        setFilter((prev) => ({
          ...prev,
          category: prefs.categories,
          source: prefs.sources,
        }));
      } catch (error) {
        console.error("Error fetching preferences:", error);
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
    <div className="min-h-screen bg-gray-100 py-6 px-4 md:px-8">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">
        News Feed
      </h1>

      {/* Search and Filters */}
      <div className="mb-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 border rounded-md w-full md:w-1/3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          name="category"
          value={filter.category}
          onChange={handleFilterChange}
          className="px-4 py-2 border rounded-md w-full md:w-1/4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
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
          className="px-4 py-2 border rounded-md w-full md:w-1/4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Sources</option>
          <option value="bbc">BBC News</option>
          <option value="guardian">The Guardian</option>
          <option value="nyt">New York Times</option>
        </select>
      </div>

      {/* Articles List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <div
            ref={articles.length === index + 1 ? lastArticleRef : null}
            key={article.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* {article.image && (
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
            )} */}
            <div className="p-4">
              <h2 className="text-lg font-bold mb-2 text-gray-800 hover:text-blue-600 transition-colors">
                {article.title}
              </h2>
              <p className="text-gray-600 mb-4">{article.description}</p>
              <div className="text-sm text-gray-500">
                <span className="font-semibold">{article.source}</span> |{" "}
                <span>
                  {new Date(article.published_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center mt-6">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
