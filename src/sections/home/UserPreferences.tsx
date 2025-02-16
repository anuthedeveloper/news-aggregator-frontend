import React, { useEffect, useState } from "react";
import {
  getPreferences,
  updatePreferences,
} from "../../services/preferenceService";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthProvider";
import { CATEGORIES, SOURCES } from "../../utils/data";

const UserPreferences: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [preferences, setPreferences] = useState({
    categories: [] as string[],
    sources: [] as string[],
  });

  const fetchPreferences = async () => {
    try {
      const data = await getPreferences();
      setPreferences({
        categories: data?.categories || [],
        sources: data?.sources || [],
      });
    } catch (error) {
      console.error("Error fetching preferences:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setPreferences((prev: any) => ({
      ...prev,
      [name]: checked
        ? [...(prev[name] || []), value] // Ensure that prev[name] is always an array
        : (prev[name] || []).filter((item: any) => item !== value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await updatePreferences(preferences);
      if (response.error) throw new Error(response.message);
      toast.success("Preferences updated successfully!");
    } catch (error: any) {
      console.error(error.message);
      toast.error(`Error updating preferences: ${error.response.data.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPreferences();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-8">
      <h1 className="text-xl font-bold mb-8 text-center text-gray-600">
        User Preferences and Settings
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left - User Details */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-normal mb-4 text-gray-800">
            User Details
          </h2>
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Name:</h3>
            <p className="text-md text-gray-600">{user?.name}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Email:</h3>
            <p className="text-md text-gray-600">{user?.email}</p>
          </div>
        </div>

        {/* Right - Preferences Settings */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md flex-1"
        >
          <h2 className="text-xl font-normal mb-6 text-gray-800">
            Update Preferences
          </h2>

          <div className="mb-6">
            <h3 className="mb-2 text-left text-lg font-semibold text-gray-900">
              Categories:
            </h3>
            <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
              {CATEGORIES.map((category) => (
                <li className="flex items-center">
                  <label
                    key={category}
                    className="inline-flex items-center mb-5 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      name="categories"
                      value={category}
                      checked={preferences.categories.includes(category)}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-gray-600 "></div>
                    <span className="ms-3 text-sm font-medium text-gray-900">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="mb-2 text-left text-lg font-semibold text-gray-900">
              Sources
            </h3>
            <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
              {SOURCES.map((source) => (
                <li className="flex items-center">
                  <label
                    key={source}
                    className="inline-flex items-center mb-5 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      name="sources"
                      value={source}
                      checked={preferences.sources.includes(source)}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-gray-600 "></div>
                    <span className="ms-3 text-sm font-medium text-gray-900">
                      {source.toUpperCase()}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 text-center">
            <button
              type="submit"
              className="text-gray-700 hover:text-white border border-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-900"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Preferences"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserPreferences;
