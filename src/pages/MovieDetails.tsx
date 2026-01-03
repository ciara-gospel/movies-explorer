import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { movieService } from '../api/movieService';
import type { Movie } from '../types/movie';
import { Star, Calendar, Bookmark, Play, X } from 'lucide-react';
import { useMovies } from '../context/MovieContext';

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPlayer, setShowPlayer] = useState(false);
  const { toggleFavorite, isFavorite } = useMovies();

  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
  const videoUrl = `https://vidsrc.xyz/embed/movie/${id}`;

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id) return;
      try {
        const data = await movieService.getMovieDetails(id);
        setMovie(data);
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return (
    <div className="h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-600"></div>
    </div>
  );
  
  if (!movie) return <div className="text-center py-20 text-white">Movie not found.</div>;

  return (
    <div className="relative min-h-screen -mt-24">
      <div className="absolute inset-0 h-[70vh]">
        <img 
          src={`${IMAGE_BASE_URL}${movie.backdrop_path}`} 
          className="w-full h-full object-cover" 
          alt={movie.title} 
        />
        <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
      </div>

      <div className="relative pt-40 px-6 max-w-6xl mx-auto flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-80 shrink-0">
          <img 
            src={`${IMAGE_BASE_URL}${movie.poster_path}`} 
            className="rounded-2xl shadow-2xl border border-white/10" 
            alt={movie.title} 
          />
        </div>

        <div className="flex flex-col gap-6">
          <h1 className="text-5xl font-black text-white">{movie.title}</h1>
          
          <div className="flex flex-wrap items-center gap-6 text-gray-300">
            <div className="flex items-center gap-2 text-yellow-500 font-bold">
              <Star size={20} fill="currentColor" />
              <span>{movie.vote_average.toFixed(1)} / 10</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={20} />
              <span>{new Date(movie.release_date).getFullYear()}</span>
            </div>
          </div>

          <p className="text-xl text-gray-300 leading-relaxed italic">
            "{movie.overview}"
          </p>

          <div className="flex gap-4">
            <button 
              onClick={() => setShowPlayer(true)}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold transition cursor-pointer"
            >
              <Play fill="white" size={20} /> Watch Now
            </button>
            
            <button 
              onClick={() => toggleFavorite(movie)}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-xl font-bold transition border border-white/10"
            >
              <Bookmark size={20} fill={isFavorite(movie.id) ? "white" : "none"} /> 
              {isFavorite(movie.id) ? "In favorites" : "Add to favorites"}
            </button>
          </div>
        </div>
      </div>

      {showPlayer && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/95 backdrop-blur-md">
          <button 
            onClick={() => setShowPlayer(false)}
            className="absolute top-8 right-8 text-white hover:text-red-600 transition p-2 bg-white/10 rounded-full z-110"
          >
            <X size={32} />
          </button>

          <div className="w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 mx-4">
            <iframe
              src={videoUrl}
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
              referrerPolicy="origin"
              scrolling="no"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;