import { useEffect, useState } from 'react';
import { movieService } from '../api/movieService';
import type { Movie } from '../types/movie';
import MovieGrid from '../components/MovieGrid';
import Pagination from '../components/Pagination';
import SortFilters from '../components/SortFilters'; // Import des filtres
import MovieSkeleton from '../components/MovieSkeleton'; // Import du skeleton

const Series = () => {
  const [series, setSeries] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('popularity.desc'); // État pour le tri
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeries = async () => {
      setLoading(true);
      try {
        // On passe désormais page ET sortBy au service
        const data = await movieService.getSeries(page, sortBy);
        
        // Note: La transformation s.name -> s.title est déjà gérée dans movieService.ts normalement,
        // mais on la garde par sécurité si ton service ne le fait pas encore partout.
        setSeries(data.results); 
        setTotalPages(Math.min(data.total_pages, 500));
      } catch (error) {
        console.error("Error fetching series:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSeries();
  }, [page, sortBy]); // On recharge si la page OU le tri change

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    setPage(1); // On reset à la page 1 lors d'un nouveau tri
  };

  return (
    <div className="pt-24 px-4 md:px-10 space-y-10 pb-20">
      <div className="flex flex-col gap-6">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
          Explore <span className="text-red-600">Series</span>
        </h1>
        
        {/* Filtres de tri identiques à la page Movies */}
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
          <MovieGrid movies={series} />
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

export default Series;