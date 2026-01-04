import { Play, Plus, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import type { Movie } from "../types/movie";

interface HeroProps {
  movies: Movie[];
}

const Hero = ({ movies }: HeroProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPlayer, setShowPlayer] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  // On limite à 20 films maximum pour la performance
  const featuredMovies = movies.slice(0, 20);
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    if (isPaused || showPlayer) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000); // 6 secondes pour laisser le temps de lire
    return () => clearInterval(interval);
  }, [currentIndex, isPaused, showPlayer, featuredMovies.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === featuredMovies.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? featuredMovies.length - 1 : prev - 1));
  };

  if (!featuredMovies.length) return null;

  return (
    <>
      <div 
        className="relative w-full h-[600px] md:h-[750px] mb-10 rounded-3xl overflow-hidden group bg-black"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Images avec fondu croisé (Crossfade) */}
        {featuredMovies.map((movie, index) => (
          <div
            key={movie.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
              alt={movie.title}
              className={`w-full h-full object-cover transform transition-transform duration-[10000ms] ${
                index === currentIndex ? "scale-110" : "scale-100"
              }`}
            />
            {/* Gradients pour la lisibilité */}
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
          </div>
        ))}

        {/* Contenu textuel animé */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-16 max-w-3xl gap-4">
          {featuredMovies.map((movie, index) => index === currentIndex && (
            <div key={movie.id} className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <span className="inline-block px-3 py-1 bg-red-600/20 border border-red-600/50 text-red-500 rounded-md text-xs font-bold tracking-widest uppercase">
                Trending Content
              </span>
              <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] drop-shadow-2xl">
                {movie.title}
              </h1>
              <p className="text-gray-300 text-lg md:text-xl line-clamp-3 max-w-xl leading-relaxed">
                {movie.overview}
              </p>

              <div className="flex items-center gap-3 md:gap-4 pt-4">
                <button
                  onClick={() => setShowPlayer(true)}
                  className="flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-2xl font-bold hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:scale-105 cursor-pointer"
                >
                  <Play fill="currentColor" size={20} />
                  <span>Watch Now</span>
                </button>
                <button className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-xl text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all border border-white/10">
                  <Plus size={20} />
                  <span>My List</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Contrôles manuels */}
        <button onClick={handlePrev} className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/20 hover:bg-red-600 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300">
          <ChevronLeft size={32} />
        </button>
        <button onClick={handleNext} className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/20 hover:bg-red-600 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300">
          <ChevronRight size={32} />
        </button>

      </div>

      {/* Lecteur Vidéo */}
      {showPlayer && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/98 backdrop-blur-xl p-4 animate-in fade-in duration-300">
          <button onClick={() => setShowPlayer(false)} className="absolute top-6 right-6 text-white hover:text-red-600 transition p-3 bg-white/5 rounded-full">
            <X size={32} />
          </button>
          <div className="w-full max-w-6xl aspect-video rounded-3xl overflow-hidden shadow-2xl shadow-red-600/10 border border-white/5">
            <iframe
              src={`https://vidsrc.xyz/embed/movie/${featuredMovies[currentIndex].id}`}
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;