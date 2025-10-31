export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800">
      <main className="text-center px-4">
        <h1 className="text-6xl font-bold text-white mb-4">
          LIFE-X-LP
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Welcome to your new landing page
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="#"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started
          </a>
          <a
            href="#"
            className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Learn More
          </a>
        </div>
      </main>
    </div>
  );
}
