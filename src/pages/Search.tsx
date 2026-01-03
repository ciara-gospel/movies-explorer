import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { movieService } from '../api/movieService';
import type { Movie } from '../types/movie';
import MovieGrid from '../components/MovieGrid';
import Pagination from '../components/Pagination';
import { SearchX } from 'lucide-react';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [results, setResults] = useState<{movies: Movie[], totalPages: number}>({
    movies: [],
    totalPages: 0
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      setLoading(true);
      try {
        const data = await movieService.searchMovies(query, currentPage);
        setResults({ movies: data.results, totalPages: data.total_pages });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, currentPage]);

  useEffect(() => { setCurrentPage(1); }, [query]);

  return (
    <div className="space-y-10 min-h-[60vh]">
      <h1 className="text-3xl font-bold">
        Results for: <span className="text-red-600">"{query}"</span>
      </h1>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-600"></div>
          <p className="text-gray-400">Searching...</p>
        </div>
      ) : results.movies.length > 0 ? (
        <>
          <MovieGrid movies={results.movies} />
          {results.totalPages > 1 && (
            <Pagination 
              currentPage={currentPage} 
              totalPages={results.totalPages} 
              onPageChange={setCurrentPage} 
            />
          )}
        </>
      ) : (
        
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="bg-white/5 p-6 rounded-full mb-6">
            <SearchX size={64} className="text-gray-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Movie not found</h2>
          <p className="text-gray-400 max-w-md">
            We couldn't find any movies or series matching <span className="text-white italic">"{query}"</span>. 
            Please try checking your spelling or using different keywords.
          </p>
        </div>
      )}
    </div>
  );
};

export default Search;