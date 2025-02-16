const Test = () => {
  return (
    <>
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <h2 className="text-xl font-semibold text-blue-600">
                  How to optimize front-end performance
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                  By <span className="font-medium text-gray-800">John Doe</span>{" "}
                  | Published on Feb 15, 2025
                </p>
                <p className="text-gray-700 mt-4">
                  Learn how to improve the performance of your front-end web
                  applications with simple yet effective techniques.
                </p>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 mt-4 inline-block"
                >
                  Read more
                </a>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <h2 className="text-xl font-semibold text-blue-600">
                  Building accessible web apps
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                  By{" "}
                  <span className="font-medium text-gray-800">Jane Smith</span>{" "}
                  | Published on Jan 20, 2025
                </p>
                <p className="text-gray-700 mt-4">
                  This article provides an introduction to building accessible
                  web applications to ensure that everyone can use your site.
                </p>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 mt-4 inline-block"
                >
                  Read more
                </a>
              </div>

              {/* <!-- More Articles... --> */}
            </div>

            {/* <!-- Sidebar --> */}
            <aside className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800">Search</h3>

              <h3 className="text-lg font-semibold text-gray-800 mt-8">
                Recent Code Repositories
              </h3>
              <ul className="space-y-2 mt-2">
                <li>
                  <a href="#" className="text-blue-600 hover:text-blue-800">
                    Performance Optimizer Tool
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:text-blue-800">
                    Accessibility Library
                  </a>
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-8">
                Featured Archives
              </h3>
              <ul className="space-y-2 mt-2">
                <li>
                  <a href="#" className="text-blue-600 hover:text-blue-800">
                    Front-End Performance with Vox Media
                  </a>
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
};

export default Test;
