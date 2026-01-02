import { useEffect, useState } from 'react';
import { movieService } from '../api/movieService';
import type { Movie } from '../types/movie';
import MovieGrid from '../components/MovieGrid';
import Pagination from '../components/Pagination';

const Series = () => {
  const [series, setSeries] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeries = async () => {
      setLoading(true);
      const data = await movieService.getSeries(page);
      setSeries(data.results.map((s: any) => ({ ...s, title: s.name })));
      setTotalPages(data.total_pages);
      setLoading(false);
    };
    fetchSeries();
  }, [page]);

  if (loading) return <div className="h-screen flex justify-center items-center font-bold">Series loading...</div>;

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-black">Explore <span className="text-brand">Series</span></h1>
      <MovieGrid movies={series} />
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default Series;