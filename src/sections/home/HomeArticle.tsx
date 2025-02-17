import { useCallback, useEffect, useState } from "react";
import { Article } from "../../types/article";
import api from "../../services/api";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { formatDateToString } from "../../utils/functions";
import { CATEGORIES, SOURCES } from "../../utils/data";
import { useAuth } from "../../context/AuthProvider";

const HomeArticle = () => {
  const token = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [filter, setFilter] = useState({
    category: "",
    source: "",
    keyword: "",
  });
  const [debouncedFilter, setDebouncedFilter] = useState(filter);

  // Debounce Search Query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300); // Adjust debounce delay (300ms)
    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // Debounce Filters
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilter(filter);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [filter]);

  // Fetch Articles
  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get("/articles/search", {
        params: {
          page,
          category: debouncedFilter.category,
          source: debouncedFilter.source,
          keyword: debouncedQuery,
        },
      });
      const newArticles = response.data.data;
      setArticles(newArticles); // Clear and set new articles
      setHasMore(response.data.next_page_url !== null);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  }, [page, debouncedFilter, debouncedQuery]);

  // Fetch on Page Change
  useEffect(() => {
    fetchArticles();
  }, [page, fetchArticles]);

  // Fetch on Filter/Search Change (but don't reset page)
  useEffect(() => {
    setPage(1); // Reset to first page on filter or search change
  }, [debouncedFilter, debouncedQuery]);

  // Fetch User Preferences
  useEffect(() => {
    if (!token) return; // Only fetch preferences if the user is logged in

    const fetchPreferences = async () => {
      try {
        const response = await api.get("/preferences");
        const prefs = response.data;
        setFilter((prev) => ({
          ...prev,
          category: prefs.categories?.join(",") || "",
          source: prefs.sources?.join(",") || "",
        }));
      } catch (error) {
        console.error("Error fetching preferences:", error);
      }
    };

    fetchPreferences();
  }, [token]);

  // Handle Pagination
  const handleNextPage = () => {
    if (hasMore) setPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 mt-8 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="md:w-1/4 md:pl-8 mt-8 md:mt-0 md:order-2 order-1">
        <div className="mb-5">
          <h3 className="text-lg font-semibold mb-4 text-left">
            Search and Filter
          </h3>
          <div className="space-y-2 space-x-2">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search by keywords..."
              className="w-full p-2 border border-gray-300 rounded-md"
              onChange={handleSearchChange}
            />

            {/* Date Filter */}
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              name="date"
              onChange={(e) => handleFilterChange(e)}
            >
              <option value="">All Dates</option>
              <option value="2025-01">January 2025</option>
              <option value="2025-02">February 2025</option>
              <option value="2025-03">March 2025</option>
            </select>

            {/* Category Filter */}
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              name="category"
              onChange={(e) => handleFilterChange(e)}
            >
              <option value="">All Categories</option>
              {CATEGORIES.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Source Filter */}
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              name="source"
              onChange={(e) => handleFilterChange(e)}
            >
              <option value="">All Sources</option>
              {SOURCES.map((source, index) => (
                <option key={index} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>
        </div>
      </aside>

      {/* Articles Section */}
      <div className="md:w-3/4 md:order-1 order-2">
        <div className="mb-10 pb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div key={article.id} className="group">
              <div className="w-full h-48 relative">
                {article?.url_to_image ? (
                  <img
                    src={article.url_to_image}
                    alt={article.title}
                    className="object-cover rounded-md"
                  />
                ) : (
                  ""
                )}
              </div>
              <div className="text-base font-normal">
                {formatDateToString(article.published_at)}
              </div>
              <h2 className="text-lg font-semibold text-gray-600 hover:underline mt-2">
                {article.title}
              </h2>
            </div>
          ))}
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center mt-8">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
          </div>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-center mt-8 space-x-4 items-center">
          <button
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            onClick={handlePreviousPage}
            disabled={page === 1}
          >
            <FiArrowLeft className="lg" />
          </button>
          <span className="text-lg font-semibold">Page {page}</span>
          <button
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            onClick={handleNextPage}
            disabled={!hasMore}
          >
            <FiArrowRight className="lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeArticle;
