import { useEffect, useState } from 'react';
import { movieService } from '../api/movieService';
import type { Movie } from '../types/movie';
import MovieGrid from '../components/MovieGrid';
import Pagination from '../components/Pagination';

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const data = await movieService.getMovies(page);
      setMovies(data.results);
      setTotalPages(data.total_pages);
      setLoading(false);
    };
    fetchMovies();
  }, [page]);

  if (loading) return <div className="h-screen flex justify-center items-center font-bold">Movies loading...</div>;

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-black">Explore <span className="text-brand">Movies</span></h1>
      <MovieGrid movies={movies} />
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default Movies;