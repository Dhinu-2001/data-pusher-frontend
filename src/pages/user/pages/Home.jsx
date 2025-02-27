import { Upload } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="container mx-auto px-4 pt-20 pb-32 relative">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
          Effortless Data Delivery to{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Multiple Destinations
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
          Seamlessly send messages or data to all your linked destinations with a single push.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
            <Link to='accounts'>
              <button
                className="flex items-center p-2 rounded bg-purple-600 hover:bg-purple-700 w-full sm:w-auto"
                size="lg"
              >
                <Upload className="mr-2 h-4 w-4" />
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${Math.random() * 3 + 2}s infinite`,
            }}
          />
        ))}
        {[...Array(6)].map((_, i) => (
          <div
            key={`card-${i}`}
            className="absolute w-12 h-12 rounded-lg bg-purple-900/20 border border-purple-500/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animation: `float ${Math.random() * 4 + 6}s infinite ease-in-out`,
            }}
          />
        ))}
      </div>

      {/* Robot Icon */}
      <div className="absolute bottom-10 right-10 w-20 h-20 text-purple-600 animate-bounce">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-full h-full"
        >
          <rect x="3" y="11" width="18" height="10" rx="2" />
          <circle cx="12" cy="5" r="2" />
          <path d="M12 7v4M8 15h.01M16 15h.01" />
        </svg>
      </div>
    </>
  );
}
