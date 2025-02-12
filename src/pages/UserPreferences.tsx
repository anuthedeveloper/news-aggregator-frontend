import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../services/authService';

interface Preferences {
  categories: string[];
  sources: string[];
  authors: string[];
}

const UserPreferences: React.FC = () => {
  const [preferences, setPreferences] = useState<Preferences>({
    categories: [],
    sources: [],
    authors: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setPreferences((prev) => {
      const updated = checked
        ? [...prev[name as keyof Preferences], value]
        : prev[name as keyof Preferences].filter((item) => item !== value);
      return { ...prev, [name]: updated };
    });
  };

  const fetchPreferences = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/preferences', {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      setPreferences(response.data || {});
    } catch (error) {
      console.error('Error fetching preferences:', error);
    }
  };

  const savePreferences = async () => {
    try {
      await axios.post('http://localhost:8000/api/preferences', preferences, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      alert('Preferences saved successfully!');
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };

  useEffect(() => {
    fetchPreferences();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">User Preferences</h1>

      {/* Categories */}
      <h2 className="text-xl mb-2">Categories:</h2>
      <label>
        <input
          type="checkbox"
          name="categories"
          value="politics"
          checked={preferences.categories.includes('politics')}
          onChange={handleChange}
        />
        Politics
      </label>
      <label>
        <input
          type="checkbox"
          name="categories"
          value="technology"
          checked={preferences.categories.includes('technology')}
          onChange={handleChange}
        />
        Technology
      </label>

      {/* Sources */}
      <h2 className="text-xl mt-4 mb-2">Sources:</h2>
      <label>
        <input
          type="checkbox"
          name="sources"
          value="bbc"
          checked={preferences.sources.includes('bbc')}
          onChange={handleChange}
        />
        BBC News
      </label>
      <label>
        <input
          type="checkbox"
          name="sources"
          value="guardian"
          checked={preferences.sources.includes('guardian')}
          onChange={handleChange}
        />
        The Guardian
      </label>

      <button
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md"
        onClick={savePreferences}
      >
        Save Preferences
      </button>
    </div>
  );
};

export default UserPreferences;
