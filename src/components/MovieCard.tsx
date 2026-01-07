import { Star, Bookmark } from 'lucide-react';
import type { Movie } from '../types/movie';
import { useMovies } from '../context/MovieContext';
import { Link } from 'react-router-dom';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const { toggleFavorite, isFavorite } = useMovies();
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  const isTV = movie.media_type === 'tv' || !!movie.name;
  const detailPath = isTV ? `/series/${movie.id}` : `/movie/${movie.id}`;

  const displayTitle = movie.title || movie.name || "Unknown Title";
  const displayDate = (movie.release_date || movie.first_air_date)?.split('-')[0] || "N/A";

  return (
    <div className="group relative bg-zinc-900 rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:z-10 shadow-lg">
      <Link to={detailPath}>
        <img
          src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'}
          alt={displayTitle}
          className="w-full aspect-2/3 object-cover block"
        />
      </Link>

      <button
        onClick={() => toggleFavorite(movie)}
        className="absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-brand transition"
      >
        <Bookmark 
          size={18} 
          fill={isFavorite(movie.id) ? "white" : "none"} 
          className={isFavorite(movie.id) ? "text-white" : ""}
        />
      </button>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-sm font-bold truncate">{displayTitle}</h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-400">{displayDate}</span>
          <div className="flex items-center gap-1 text-yellow-500 text-xs">
            <Star size={12} fill="currentColor" />
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;