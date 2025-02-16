import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const articles = [
  {
    id: 1,
    title:
      "Sincerely, Leaders of Color: You need to be a different kind of leader in the bad times",
    author: "P. Kim Bui",
    date: "March 17, 2023",
    summary:
      "Our eyes are open to the uphill battles our news organizations are facing.",
    image: "/leader.jpg",
  },
  {
    id: 2,
    title:
      "I tested how well ChatGPT can pull data out of messy PDFs (and here’s a script so you can too)",
    author: "Brandon Roberts",
    date: "March 1, 2023",
    summary:
      "Scattered errors and hallucinated data make it an exploratory tool, not a shortcut to analysis.",
    image: "/chatgpt-pdf.jpg",
  },
];

export default function Article() {
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 mt-8">
      <h1 className="text-3xl font-semibold mb-2 text-left">News</h1>
      {/* Mobile Sidebar Toggle */}
      <button
        className="md:hidden flex items-center space-x-2 p-2 border rounded-md mb-4"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <FiX className="text-xl" />
        ) : (
          <FiMenu className="text-xl" />
        )}
        <span>{isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}</span>
      </button>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } md:block md:col-span-1 border-b md:border-none md:order-2 order-1`}
        >
          {/* Search Input at the Top */}
          <input
            type="text"
            placeholder="Search articles..."
            className="w-full p-2 border rounded-md mb-4 text-left"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <h3 className="text-xl font-bold mb-2 text-left">Categories</h3>
          <ul className="space-y-2 mb-4 text-left">
            <li className="text-blue-500 hover:underline">Business</li>
            <li className="text-blue-500 hover:underline">Technology</li>
          </ul>

          <div className="border-t pt-4 text-left">
            <h3 className="text-xl font-bold mb-2">
              Get News from different sources
            </h3>
            <ul className="space-y-2">
              <li className="text-blue-500 hover:underline">BBC News</li>
              <li className="text-blue-500 hover:underline">New York Times</li>
            </ul>
          </div>
        </div>

        {/* Article List */}
        <div className="md:col-span-2 space-y-6 md:order-1 order-2">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="flex flex-col md:flex-row items-start space-x-4 border-b pb-4"
            >
              <div className="flex-1 text-left">
                <h2 className="text-lg font-semibold text-blue-600 hover:underline">
                  {article.title}
                </h2>
                <p className="text-sm text-gray-500">
                  By {article.author} - {article.date}
                </p>
                <p className="text-gray-700">{article.summary}</p>
              </div>
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full md:w-32 rounded-md mt-2 md:mt-0"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
