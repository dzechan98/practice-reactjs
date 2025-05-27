export const BlogPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Blog</h1>
      <p className="mb-8">
        Welcome to our blog. Here you'll find the latest news, articles, and
        insights.
      </p>
      <div className="space-y-8">
        <div className="border p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">Blog Post Title One</h2>
          <p className="text-gray-600 mb-1">
            Published on May 27, 2025 by Admin
          </p>
          <p className="mb-4">
            This is a summary of the first blog post. It gives a brief overview
            of the content and entices the reader to learn more.
          </p>
          <a href="#" className="text-blue-500 hover:underline">
            Read more...
          </a>
        </div>
        <div className="border p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">Blog Post Title Two</h2>
          <p className="text-gray-600 mb-1">
            Published on May 26, 2025 by Contributor
          </p>
          <p className="mb-4">
            A brief insight into another interesting topic. Explore the details
            and expand your knowledge with this engaging article.
          </p>
          <a href="#" className="text-blue-500 hover:underline">
            Read more...
          </a>
        </div>
        <div className="border p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">Blog Post Title Three</h2>
          <p className="text-gray-600 mb-1">
            Published on May 25, 2025 by Guest Author
          </p>
          <p className="mb-4">
            Discover new perspectives and ideas in this thought-provoking piece.
            We cover various aspects to give you a comprehensive understanding.
          </p>
          <a href="#" className="text-blue-500 hover:underline">
            Read more...
          </a>
        </div>
      </div>
    </div>
  );
};
