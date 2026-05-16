import { useState, useEffect } from 'react';
import type { TMDBResponse } from '../types/movie';

export function useFetchMovies(fetchFn: (page: number) => Promise<TMDBResponse>) {
  const [data, setData] = useState<TMDBResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      try {
        const result = await fetchFn(page);
        setData(result);
        setError(null);
      } catch (err) {
        setError("Unable to load movies.");
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, [fetchFn, page]);

  return { data, loading, error, page, setPage };
}