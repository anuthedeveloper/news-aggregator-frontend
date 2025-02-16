import Image from "./ui/Image";

const articles = [
  {
    id: 1,
    title:
      "Our search for the best tabular-data extraction tool in 2024, and what we found",
    image: "/images/article1.jpg",
  },
  {
    id: 2,
    title: "How to tell good LGBTQ+ stories with bad data",
    image: "/images/article2.jpg",
  },
  {
    id: 3,
    title: "7 tips for data-driven journalism about LGBTQ+ communities",
    image: "/images/article3.jpg",
  },
  {
    id: 4,
    title:
      "Fact-checking in 2024? Five tools to help with research and promotion",
    image: "/images/article4.jpg",
  },
  {
    id: 5,
    title: "By what metric?",
    image: "/images/article5.jpg",
  },
  {
    id: 6,
    title:
      "Much of what made social media feel special to journalists is gone. What now?",
    image: "/images/article6.jpg",
  },
];

export default function HomeArticle() {
  return (
    <div className="container mx-auto p-4 mt-8 flex flex-col md:flex-row">
      {/* Articles Section */}
      <div className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div key={article.id} className="group">
            <div className="w-full h-48 relative">
              <img
                src={article.image}
                alt={article.title}
                className="object-cover rounded-md"
              />
            </div>
            <h2 className="text-lg font-semibold text-blue-600 hover:underline mt-2">
              {article.title}
            </h2>
          </div>
        ))}
      </div>

      {/* Sidebar */}
      <aside className="md:w-1/4 md:pl-8 mt-8 md:mt-0">
        <h3 className="text-lg font-bold mb-4 text-left">Source Guides</h3>
        <ul className="space-y-2 text-left">
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              Defending Accounts Against Common Attacks
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              Working Together
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              News Apps Essentials
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              See all guides »
            </a>
          </li>
        </ul>
      </aside>
    </div>
  );
}
