import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { movieService } from "../api/movieService";
import type { Movie, TMDBResponse } from "../types/movie";
import { Star, Calendar, Bookmark, Play, X, ArrowLeft } from "lucide-react";
import { useMovies } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useMovies();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [similar, setSimilar] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPlayer, setShowPlayer] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [episodes, setEpisodes] = useState<any[]>([]);

  const isTV = location.pathname.includes("/series");
  const displayTitle = movie?.title || (movie as any)?.name || "Loading...";
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

  const videoUrl = isTV
    ? `https://vidsrc.xyz/embed/tv/${id}/${selectedSeason}/${selectedEpisode}`
    : `https://vidsrc.xyz/embed/movie/${id}`;

  useEffect(() => {
    const fetchAllData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        setMovie(null);
        setSimilar([]);
        let detailsData: Movie;

        let similarData: TMDBResponse = {
          results: [],
          page: 1,
          total_pages: 0,
          total_results: 0,
        };

        if (location.pathname.includes("/series")) {
          detailsData = await movieService.getSeriesDetails(id);
        } else {
          try {
            detailsData = await movieService.getMovieDetails(id);
            similarData = await movieService.getSimilarMovies(id);
          } catch {
            detailsData = await movieService.getSeriesDetails(id);
          }
        }

        setMovie(detailsData);
        setSimilar(similarData.results.slice(0, 12));
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id, location.pathname]);

  useEffect(() => {
    if (isTV && id && movie) {
      movieService
        .getSeasonDetails(id, selectedSeason)
        .then((data) => setEpisodes(data.episodes || []))
        .catch((err) => console.error("Error fetching episodes:", err));
    }
  }, [id, selectedSeason, isTV, movie]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-zinc-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-600"></div>
      </div>
    );

  if (!movie)
    return (
      <div className="text-center py-20 text-white font-bold">
        Content not found.
      </div>
    );

  return (
    <div className="relative min-h-screen -mt-24 pb-20 bg-zinc-950 text-white">
      <button
        onClick={() => navigate(-1)}
        className="fixed top-28 left-6 z-50 flex items-center gap-2 bg-black/40 hover:bg-red-600 backdrop-blur-md text-white px-4 py-2 rounded-xl border border-white/10 transition-all duration-300 group cursor-pointer"
      >
        <ArrowLeft
          size={20}
          className="group-hover:-translate-x-1 transition-transform"
        />
        <span className="font-bold text-sm uppercase tracking-wider">Back</span>
      </button>

      <div className="absolute inset-0 h-[70vh]">
        <img
          src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
          className="w-full h-full object-cover"
          alt={displayTitle}
        />
        <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
      </div>

      <div className="relative pt-40 px-6 max-w-6xl mx-auto flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-80 shrink-0">
          <img
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            className="rounded-2xl shadow-2xl border border-white/10"
            alt={displayTitle}
          />
        </div>

        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <span className="text-red-600 font-bold uppercase tracking-widest text-sm">
              {isTV ? "TV Series" : "Movie"}
            </span>
            <h1 className="text-4xl md:text-5xl font-black leading-tight">
              {displayTitle}
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
                  movie.release_date || (movie as any).first_air_date || ""
                ).getFullYear()}
              </span>
            </div>
          </div>

          <p className="text-lg md:text-xl text-gray-300 leading-relaxed italic">
            "{movie.overview}"
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => {
                setSelectedEpisode(1);
                setShowPlayer(true);
              }}
              className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white p-4 md:px-8 md:py-4 rounded-xl font-bold transition cursor-pointer shrink-0"
            >
              <Play fill="white" size={20} />
              <span className="hidden md:block">Watch Now</span>
            </button>

            <button
              onClick={() => toggleFavorite(movie)}
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-4 md:px-8 md:py-4 rounded-xl font-bold transition border border-white/10 shrink-0"
            >
              <Bookmark
                size={20}
                fill={isFavorite(movie.id) ? "white" : "none"}
              />
              <span className="hidden md:block">
                {isFavorite(movie.id) ? "In favorites" : "Add to favorites"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {isTV && (movie as any).seasons && (
        <div className="relative mt-24 px-6 max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
              Seasons & <span className="text-red-600">Episodes</span>
            </h2>

            <select
              value={selectedSeason}
              onChange={(e) => {
                setSelectedSeason(Number(e.target.value));
                setSelectedEpisode(1);
              }}
              className="bg-zinc-900 text-white border border-white/10 px-4 py-2 rounded-xl outline-none focus:border-red-600 cursor-pointer"
            >
              {(movie as any).seasons.map((season: any) => (
                <option key={season.id} value={season.season_number}>
                  {season.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {episodes.map((episode: any) => {
              const isActive = selectedEpisode === episode.episode_number;

              return (
                <button
                  key={episode.id}
                  onClick={() => {
                    setSelectedEpisode(episode.episode_number);
                    setShowPlayer(true);
                  }}
                  className={`flex gap-4 p-3 rounded-2xl border transition group text-left ${
                    isActive
                      ? "bg-red-600/20 border-red-600 shadow-[0_0_15px_rgba(220,38,38,0.2)]"
                      : "bg-white/5 border-white/5 hover:bg-white/10"
                  }`}
                >
                  <div className="relative w-28 h-16 shrink-0 rounded-lg overflow-hidden bg-zinc-800">
                    {episode.still_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w300${episode.still_path}`}
                        className={`w-full h-full object-cover transition-transform duration-500 ${
                          isActive ? "scale-110" : "group-hover:scale-110"
                        }`}
                        alt={episode.name}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-[8px] text-zinc-500 uppercase font-bold">
                        No Image
                      </div>
                    )}

                    <div
                      className={`absolute inset-0 flex items-center justify-center transition-opacity bg-black/40 ${
                        isActive
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      <Play
                        size={16}
                        fill="white"
                        className={isActive ? "animate-pulse" : ""}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col justify-center min-w-0">
                    <h4
                      className={`font-bold text-sm truncate ${
                        isActive ? "text-red-600" : "text-white"
                      }`}
                    >
                      {episode.episode_number}. {episode.name}
                    </h4>
                    <p className="text-zinc-500 text-xs line-clamp-1 mt-1">
                      {isActive
                        ? "Now Playing..."
                        : episode.overview || "No description available."}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {!isTV && similar.length > 0 && (
        <div className="relative mt-24 px-6 max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white">
              You might also <span className="text-red-600">like</span>
            </h2>
            <div className="h-px flex-1 bg-white/10 rounded-full" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {similar.map((simMovie) => (
              <MovieCard key={simMovie.id} movie={simMovie} />
            ))}
          </div>
        </div>
      )}

      {showPlayer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
          <button
            onClick={() => setShowPlayer(false)}
            className="absolute top-8 right-8 text-white hover:text-red-600 transition p-2 bg-white/10 rounded-full z-[110]"
          >
            <X size={32} />
          </button>

          <div className="w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <iframe
              src={videoUrl}
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
              referrerPolicy="origin"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
