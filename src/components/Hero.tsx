import { Play, Plus, X } from 'lucide-react';
import { useState } from 'react';
import type { Movie } from '../types/movie';

interface HeroProps {
  movie: Movie;
}

const Hero = ({ movie }: HeroProps) => {
  const [showPlayer, setShowPlayer] = useState(false);
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

  const videoUrl = `https://vidsrc.xyz/embed/movie/${movie.id}`;

  return (
    <>
      <div className="relative w-full h-150 mb-10 rounded-3xl overflow-hidden group">
        <div className="absolute inset-0">
          <img
            src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-dark via-transparent to-transparent" />
        </div>

        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 max-w-2xl gap-4">
          <span className="text-red-600 font-bold tracking-widest uppercase text-sm">Don't miss</span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">{movie.title}</h1>
          <p className="text-gray-300 text-lg line-clamp-3">{movie.overview}</p>

          <div className="flex items-center gap-4 mt-4">
            <button 
              onClick={() => setShowPlayer(true)}
              className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition cursor-pointer z-10"
            >
              <Play fill="black" size={20} /> Watch Now
            </button>
            <button className="flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-8 py-3 rounded-xl font-bold hover:bg-white/30 transition">
              <Plus size={20} /> My List
            </button>
          </div>
        </div>
      </div>

      {showPlayer && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/95 backdrop-blur-sm">
          <button 
            onClick={() => setShowPlayer(false)}
            className="absolute top-10 right-10 text-white hover:text-red-600 transition p-2 bg-white/10 rounded-full"
          >
            <X size={32} />
          </button>

          <div className="w-full max-w-6xl aspect-video bg-black rounded-xl overflow-hidden shadow-[0_0_50px_rgba(220,38,38,0.3)] border border-white/10">
            <iframe
              src={videoUrl}
              className="w-full h-full"
              frameBorder="0"
              scrolling="no"
              allowFullScreen
              referrerPolicy="origin"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;