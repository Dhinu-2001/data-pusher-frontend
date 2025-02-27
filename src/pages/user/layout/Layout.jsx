import { Outlet } from 'react-router-dom'
import NavBar from "../../../page_components/common/NavBar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <NavBar />
      <Outlet/>
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
    </div>
  );
}