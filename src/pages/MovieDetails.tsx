import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { movieService } from "../api/movieService";
import type { Movie } from "../types/movie";
import { Star, Calendar, Bookmark, Play, X } from "lucide-react";
import { useMovies } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [similar, setSimilar] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPlayer, setShowPlayer] = useState(false);
  const { toggleFavorite, isFavorite } = useMovies();

  const isTV =
    location.pathname.includes("/series") ||
    (movie as any)?.media_type === "tv";
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

  const videoUrl = isTV
    ? `https://vidsrc.xyz/embed/tv/${id}`
    : `https://vidsrc.xyz/embed/movie/${id}`;

  useEffect(() => {
    const fetchAllData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        let detailsData;
        let similarData;

        // Détection du type de contenu et récupération des données
        if (location.pathname.includes("/series")) {
          detailsData = await movieService.getSeriesDetails(id);
          similarData = await movieService.getSimilarSeries(id);
        } else {
          try {
            detailsData = await movieService.getMovieDetails(id);
            similarData = await movieService.getSimilarMovies(id);
          } catch {
            // Fallback si l'ID est une série mais accédé via la route movie
            detailsData = await movieService.getSeriesDetails(id);
            similarData = await movieService.getSimilarSeries(id);
          }
        }

        setMovie(detailsData);
        setSimilar(similarData.results.slice(0, 12)); // On garde les 12 premiers
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
    // Remonter en haut de page lors du changement de film
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id, location.pathname]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-600"></div>
      </div>
    );

  if (!movie)
    return (
      <div className="text-center py-20 text-white">Content not found.</div>
    );

  return (
    <div className="relative min-h-screen -mt-24 pb-20">
      {/* Background Hero Section */}
      <div className="absolute inset-0 h-[70vh]">
        <img
          src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
          className="w-full h-full object-cover"
          alt={movie.title}
        />
        <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="relative pt-40 px-6 max-w-6xl mx-auto flex flex-col md:flex-row gap-10">
        {/* Poster */}
        <div className="w-full md:w-80 shrink-0">
          <img
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            className="rounded-2xl shadow-2xl border border-white/10"
            alt={movie.title}
          />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <span className="text-red-600 font-bold uppercase tracking-widest text-sm">
              {isTV ? "TV Series" : "Movie"}
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
              {movie.title}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-gray-300">
            <div className="flex items-center gap-2 text-yellow-500 font-bold">
              <Star size={20} fill="currentColor" />
              <span>{movie.vote_average?.toFixed(1)} / 10</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={20} />
              <span>
                {new Date(
                  movie.release_date || (movie as any).first_air_date
                ).getFullYear()}
              </span>
            </div>
          </div>

          <p className="text-lg md:text-xl text-gray-300 leading-relaxed italic">
            "{movie.overview}"
          </p>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => setShowPlayer(true)}
              className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white p-4 md:px-8 md:py-4 rounded-xl font-bold transition cursor-pointer shrink-0"
            >
              <Play fill="white" size={20} />
              <span className="hidden md:inline">Watch Now</span>
            </button>

            <button
              onClick={() => toggleFavorite(movie)}
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-4 md:px-8 md:py-4 rounded-xl font-bold transition border border-white/10 shrink-0"
            >
              <Bookmark
                size={20}
                fill={isFavorite(movie.id) ? "white" : "none"}
              />
              <span className="hidden md:inline">
                {isFavorite(movie.id) ? "In favorites" : "Add to favorites"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      {similar.length > 0 && (
        <div className="relative mt-24 px-6 max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white">
              You might also <span className="text-red-600">like</span>
            </h2>
            <div className="h-[1px] flex-1 bg-white/10 rounded-full" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {similar.map((simMovie) => (
              <MovieCard key={simMovie.id} movie={simMovie} />
            ))}
          </div>
        </div>
      )}

      {/* Video Player Modal */}
      {showPlayer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md">
          <button
            onClick={() => setShowPlayer(false)}
            className="absolute top-8 right-8 text-white hover:text-red-600 transition p-2 bg-white/10 rounded-full z-[110]"
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