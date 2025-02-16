import React, { useEffect, useState } from "react";
import { fetchArticles, searchArticles } from "../services/articleService";
import { Article } from "../types/article";

const SearchArticle = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [sources, setSources] = useState<string[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);

  // Fetch Filter Options
  const fetchFilterOptions = async () => {
    try {
      // Fetch categories
      const categoryData = await searchArticles({ type: "categories" });
      setCategories(categoryData.categories);

      // Fetch sources
      const sourceData = await searchArticles({ type: "sources" });
      setSources(sourceData.sources);

      // Fetch authors
      const authorData = await searchArticles({ type: "author" });
      setAuthors(authorData.author);
    } catch (error) {
      console.error("Error fetching filter options:", error);
    }
  };

  // Fetch Articles
  const fetchFilteredArticles = async () => {
    try {
      const filters = {
        keyword: searchTerm,
        date: dateFilter,
        category: categoryFilter,
        source: sourceFilter,
        author: authorFilter,
        page,
      };
      const data = await fetchArticles(filters);
      setArticles(data.articles);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  // Load filter options once on component mount
  useEffect(() => {
    fetchFilterOptions();
  }, []);

  // Fetch articles when filters or page changes
  useEffect(() => {
    fetchFilteredArticles();
  }, [
    searchTerm,
    dateFilter,
    categoryFilter,
    sourceFilter,
    authorFilter,
    page,
  ]);

  return (
    <div className="container mx-auto p-5">
      <div className="mb-5">
        <h2 className="text-3xl font-bold text-center mb-4">
          Search and Filter Articles
        </h2>
        <div className="flex justify-center gap-4">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search articles..."
            className="p-2 w-1/3 border border-gray-300 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Date Filter */}
          <select
            className="p-2 border border-gray-300 rounded-md"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="">All Dates</option>
            <option value="2025-01">January 2025</option>
            <option value="2025-02">February 2025</option>
            <option value="2025-03">March 2025</option>
          </select>

          {/* Category Filter */}
          <select
            className="p-2 border border-gray-300 rounded-md"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Source Filter */}
          <select
            className="p-2 border border-gray-300 rounded-md"
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
          >
            <option value="">All Sources</option>
            {sources.map((source, index) => (
              <option key={index} value={source}>
                {source}
              </option>
            ))}
          </select>

          {/* Author Filter */}
          <select
            className="p-2 border border-gray-300 rounded-md"
            value={authorFilter}
            onChange={(e) => setAuthorFilter(e.target.value)}
          >
            <option value="">All Authors</option>
            {authors.map((author, index) => (
              <option key={index} value={author}>
                {author}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Articles List */}
      <div>
        {articles.length === 0 ? (
          <p className="text-center text-gray-500">No articles found</p>
        ) : (
          <ul>
            {articles.map((article) => (
              <li
                key={article.id}
                className="mb-4 p-4 border border-gray-300 rounded-md"
              >
                <h3 className="text-xl font-semibold">{article.title}</h3>
                <p className="text-sm text-gray-500">{article.published_at}</p>
                <p className="text-sm text-gray-700">
                  Category: {article.category}
                </p>
                <p className="text-sm text-gray-700">
                  Source: {article.source}
                </p>
                <p className="text-sm text-gray-700">
                  Author: {article.author}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded-md mr-2"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2">{page}</span>
        <button
          className="px-4 py-2 bg-gray-300 rounded-md"
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SearchArticle;
