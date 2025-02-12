import React, { useEffect, useState } from "react";
import {
  getPreferences,
  updatePreferences,
} from "../services/preferenceService";

const categories = ["politics", "technology", "sports"];
const sources = ["bbc", "guardian", "nyt"];

const Profile: React.FC = () => {
  const [preferences, setPreferences] = useState({
    categories: [] as string[],
    sources: [] as string[],
  });

  const fetchPreferences = async () => {
    try {
      const data = await getPreferences();
      setPreferences(data || { categories: [], sources: [] });
    } catch (error) {
      console.error("Error fetching preferences:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setPreferences((prev: any) => ({
      ...prev,
      [name]: checked
        ? [...prev[name], value]
        : prev[name].filter((item: any) => item !== value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updatePreferences(preferences);
      alert("Preferences updated successfully!");
    } catch (error) {
      console.error("Error updating preferences:", error);
    }
  };

  useEffect(() => {
    fetchPreferences();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 md:px-8">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">
        User Profile
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-semibold mb-4">Preferences</h2>

        <div className="mb-4">
          <h3 className="font-semibold">Categories:</h3>
          {categories.map((category) => (
            <label key={category} className="block">
              <input
                type="checkbox"
                name="categories"
                value={category}
                checked={preferences.categories.includes(category)}
                onChange={handleChange}
                className="mr-2"
              />
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </label>
          ))}
        </div>

        <div className="mb-4">
          <h3 className="font-semibold">Sources:</h3>
          {sources.map((source) => (
            <label key={source} className="block">
              <input
                type="checkbox"
                name="sources"
                value={source}
                checked={preferences.sources.includes(source)}
                onChange={handleChange}
                className="mr-2"
              />
              {source.toUpperCase()}
            </label>
          ))}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Save Preferences
        </button>
      </form>
    </div>
  );
};

export default Profile;
