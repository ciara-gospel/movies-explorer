import { useSearchParams } from 'react-router-dom';
import { useState, useEffect, } from 'react';
import { movieService } from '../api/movieService';
import type { Movie } from '../types/movie';
import MovieGrid from '../components/MovieGrid';
import Pagination from '../components/Pagination';

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
    <div className="space-y-10">
      <h1 className="text-3xl font-bold">
        Results for: <span className="text-brand">"{query}"</span>
      </h1>

      {loading ? (
        <div className="flex justify-center py-20 animate-pulse text-gray-400">Searching...</div>
      ) : (
        <>
          <MovieGrid movies={results.movies} />
          <Pagination 
            currentPage={currentPage} 
            totalPages={results.totalPages} 
            onPageChange={setCurrentPage} 
          />
        </>
      )}
    </div>
  );
};

export default Search;