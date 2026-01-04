import { useEffect, useState } from 'react';
import { movieService } from '../api/movieService';
import type { Movie } from '../types/movie';
import MovieGrid from '../components/MovieGrid';
import Pagination from '../components/Pagination';
import SortFilters from '../components/SortFilters'; // Import des filtres
import MovieSkeleton from '../components/MovieSkeleton'; // Import du skeleton

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('popularity.desc'); // Nouvel état pour le tri
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        // On utilise maintenant sortBy dans l'appel API
        // Note: Assure-toi que getMovies dans ton service accepte le tri ou utilise getMoviesByGenre avec l'ID du genre ou discover
        const data = await movieService.getMovies(page, sortBy); 
        setMovies(data.results);
        setTotalPages(Math.min(data.total_pages, 500)); // TMDB limite souvent à 500 pages pour le discover
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [page, sortBy]); // On recharge si la page OU le tri change

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    setPage(1); // Très important : on revient à la page 1 quand on change le tri
  };

  return (
    <div className="pt-24 px-4 md:px-10 space-y-10 pb-20">
      <div className="flex flex-col gap-6">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
          Explore <span className="text-red-600">Movies</span>
        </h1>
        
        {/* Intégration des filtres de tri */}
        <SortFilters currentSort={sortBy} onSortChange={handleSortChange} />
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {[...Array(12)].map((_, i) => (
            <MovieSkeleton key={i} />
          ))}
        </div>
      ) : (
        <>
          <MovieGrid movies={movies} />
          <div className="pt-10">
            <Pagination 
              currentPage={page} 
              totalPages={totalPages} 
              onPageChange={setPage} 
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Movies;