import React from "react";
import bgImg from '../assets/farmland.jpg'; // Make sure this path and filename match your actual image

const HeroSection = () => {
  const handleExploreClick = () => {
    const marketplace = document.getElementById("marketplace");
    if (marketplace) {
      marketplace.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="w-full min-h-[60vh] flex items-center justify-center relative bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.45),rgba(0,0,0,0.45)), url(${bgImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent z-0"></div>
      <div className="relative z-10 text-center text-white px-4 py-16">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
          Fresh From The Farm
        </h1>
        <p className="text-lg md:text-2xl mb-8 drop-shadow">
          Discover organic produce and local goods delivered to your door.
        </p>
        <button
          onClick={handleExploreClick}
          className="bg-green-600 hover:bg-green-700 transition px-8 py-3 rounded-full text-lg font-semibold shadow-lg
            transform hover:scale-105 active:scale-95 duration-200 relative overflow-hidden group"
        >
          <span className="relative z-10">Explore Now</span>
          {/* Shine animation */}
          <span className="absolute left-0 top-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="absolute left-[-75%] top-0 w-1/3 h-full bg-white/30 blur-lg transform skew-x-[-20deg] group-hover:animate-shine"></span>
          </span>
        </button>
      </div>
      {/* Tailwind custom animation for shine */}
      <style>
        {`
          @keyframes shine {
            0% { left: -75%; }
            100% { left: 125%; }
          }
          .group-hover\\:animate-shine:hover .group-hover\\:animate-shine {
            animation: shine 0.8s linear forwards;
          }
        `}
      </style>
    </section>
  );
};

export default HeroSection;
