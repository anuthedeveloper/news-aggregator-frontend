import { Link } from "react-router-dom";
import { HOME_PATH } from "../../routes/path";
import React from "react";

const Hero: React.FC = () => {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center text-center py-20">
      <h2 className="text-4xl font-bold mb-4 text-gray-800">
        Stay Informed with the Latest News
      </h2>
      <p className="text-lg text-gray-600 mb-8">
        Get news from trusted sources and personalize your feed.
      </p>
      <Link
        to={HOME_PATH.news}
        className="px-6 py-3 border-2 border-gray-600 text-gray rounded-full hover:bg-gray-200 transition"
      >
        Explore News
      </Link>
    </div>
  );
};

export default Hero;
