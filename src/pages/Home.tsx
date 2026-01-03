import { useEffect, useState } from 'react';
import { movieService } from '../api/movieService';
import type { Movie } from '../types/movie';
import Hero from '../components/Hero';
import MovieCard from '../components/MovieCard';
import MovieRow from '../components/MovieRow';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await movieService.getTrending();
        setTrendingMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  if (loading) return (
    <div className="h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-600"></div>
    </div>
  );

  return (
    <div className="space-y-16 pb-20">
      {trendingMovies.length > 0 && <Hero movie={trendingMovies[0]} />}
      
      <div className="px-4 md:px-10 space-y-16">
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter">
              Trending Now
            </h2>
            <div className="h-1px flex-1 bg-white/10 ml-6 rounded-full hidden md:block" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {trendingMovies.slice(1, 7).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        <MovieRow title="Action Movies" genreId={28} />
        <MovieRow title="Comedy" genreId={35} />
        <MovieRow title="Romance" genreId={10749} />
        <MovieRow title="Horror & Thriller" genreId={27} />
      </div>
    </div>
  );
};

export default Home;