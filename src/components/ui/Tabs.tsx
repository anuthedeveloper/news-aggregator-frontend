import React, { useState } from "react";

const tabs = [
  {
    name: "Trends",
    content: "Check out the latest trends in web development and tech!",
  },
  {
    name: "Frontend",
    content: "Explore the world of frontend technologies and frameworks!",
  },
  {
    name: "Backend",
    content: "Discover backend development tools and best practices!",
  },
  {
    name: "Cloud",
    content: "Learn about cloud computing and deployment solutions!",
  },
  {
    name: "AI",
    content:
      "Dive into the world of artificial intelligence and machine learning!",
  },
  {
    name: "Tools",
    content: "Find out about the latest development tools and utilities!",
  },
];

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("Trends");

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Tab Navigation */}
      <div className="flex justify-center space-x-4 bg-gray-100 rounded-md p-4">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === tab.name
                ? "bg-white shadow text-gray-900 font-semibold"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Content Section */}
      <div className="text-center mt-8">
        <h2 className="text-sm font-semibold text-gray-800">
          Latest Blog Posts
        </h2>
        <h1 className="text-4xl font-bold text-gray-900 mt-2">
          {activeTab} News
        </h1>
        <p className="text-gray-500 mt-4">
          {tabs.find((tab) => tab.name === activeTab)?.content}
        </p>
      </div>
    </div>
  );
};

export default Tabs;
