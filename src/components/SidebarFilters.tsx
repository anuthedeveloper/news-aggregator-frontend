import React, { useEffect, useState } from "react";
import { searchArticles } from "../services/articleService";

const SidebarFilters = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [sources, setSources] = useState<string[]>([]);

  // Fetch Categories and Sources
  const fetchFilters = async () => {
    try {
      // Fetch categories
      const categoryData = await searchArticles({ type: "categories" });
      setCategories(categoryData.data.categories);

      // Fetch sources
      const sourceData = await searchArticles({ type: "sources" });
      setSources(sourceData.data.sources);
    } catch (error) {
      console.error("Error fetching filters:", error);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchFilters();
  }, []);

  return (
    <div className="p-5">
      {/* Categories List */}
      <h3 className="text-lg font-semibold mb-2 text-left">Categories</h3>
      <ul className="space-y-2 mb-4 text-left">
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <li
              key={index}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              {category}
            </li>
          ))
        ) : (
          <li className="text-gray-500">No categories available</li>
        )}
      </ul>

      {/* Sources List */}
      <div className="border-t pt-4 text-left">
        <h3 className="text-lg font-semibold mb-2">
          Get News from different sources
        </h3>
        <ul className="space-y-2">
          {sources.length > 0 ? (
            sources.map((source, index) => (
              <li
                key={index}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                {source}
              </li>
            ))
          ) : (
            <li className="text-gray-500">No sources available</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SidebarFilters;
