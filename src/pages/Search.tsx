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

        const filteredResults = data.results.filter((m: any) => 
        (m.media_type === 'movie' || m.media_type === 'tv') && m.poster_path);
        
        const transformedMovies = filteredResults.map((m: any) => ({
          ...m,
          media_type: m.media_type,
          title: m.title || m.name || "Untitled"
        }));

        setResults({ 
          movies: transformedMovies, 
          totalPages: data.total_pages 
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
    window.scrollTo(0, 0);
  }, [query, currentPage]);

  useEffect(() => { setCurrentPage(1); }, [query]);

  return (
    <div className="pt-24 px-6 space-y-10 min-h-[60vh] pb-20 bg-zinc-950 text-white">
      <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
        Results for: <span className="text-red-600">"{query}"</span>
      </h1>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-600 border-r-transparent"></div>
          <p className="text-gray-400 font-medium">Searching our database...</p>
        </div>
      ) : results.movies.length > 0 ? (
        <>
          <MovieGrid movies={results.movies} />
          
          {results.totalPages > 1 && (
            <div className="pt-10">
              <Pagination 
                currentPage={currentPage} 
                totalPages={results.totalPages} 
                onPageChange={setCurrentPage} 
              />
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center animate-in fade-in duration-700">
          <div className="bg-white/5 p-8 rounded-full mb-6 border border-white/10">
            <SearchX size={64} className="text-gray-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">No results found</h2>
          <p className="text-gray-400 max-w-md mx-auto">
            We couldn't find anything matching <span className="text-white italic">"{query}"</span>. 
            Try searching for a movie or a TV show title.
          </p>
        </div>
      )}
    </div>
  );
};

export default Search;