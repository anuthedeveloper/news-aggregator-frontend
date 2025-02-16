import React from "react";

const CURRENT_YEAR = new Date().getFullYear();

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4">
        {/* Community Section */}
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Join our community!
          </h2>
          <p className="text-lg md:w-6/12 text-center mb-8">
            Get news in your inbox every week! We hate spam too, so no worries.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <input
              type="email"
              placeholder="Email address"
              className="px-4 py-2 w-full md:w-80 rounded-md border border-white bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-gray-300"
            />
            <button
              type="submit"
              className="px-6 py-2 rounded-md bg-white text-gray-900 font-bold shadow-md hover:shadow-lg transition-shadow"
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-sm text-gray-400">
            &copy; {CURRENT_YEAR} News Aggregator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
