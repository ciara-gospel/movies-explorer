import { useEffect, useState } from 'react';
import { movieService } from '../api/movieService';
import type { Movie } from '../types/movie';
import Hero from '../components/Hero';
import MovieCard from '../components/MovieCard';
import MovieRow from '../components/MovieRow';
import MovieSkeleton from '../components/MovieSkeleton'; // Import du skeleton

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

  // Affichage des Skeletons pendant le chargement
  if (loading) {
    return (
      <div className="space-y-16 pb-20">
        {/* Skeleton pour le Hero */}
        <div className="relative w-full h-[500px] md:h-[600px] bg-zinc-900 animate-pulse rounded-3xl" />
        
        <div className="px-4 md:px-10 space-y-16">
          <section>
            {/* Skeleton pour le titre de la section */}
            <div className="h-8 bg-zinc-900 w-48 rounded mb-8 animate-pulse" />
            
            {/* Grille de skeletons pour Trending Now */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {[...Array(6)].map((_, i) => (
                <MovieSkeleton key={i} />
              ))}
            </div>
          </section>
          
          {/* Simulation de deux MovieRows en chargement */}
          {[...Array(2)].map((_, i) => (
            <div key={i} className="space-y-6">
               <div className="h-8 bg-zinc-900 w-64 rounded animate-pulse" />
               <div className="flex gap-4 overflow-hidden">
                 {[...Array(6)].map((_, j) => (
                   <div key={j} className="w-[130px] md:w-[240px] shrink-0">
                     <MovieSkeleton />
                   </div>
                 ))}
               </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-16 pb-20">
      {trendingMovies.length > 0 && <Hero movies={trendingMovies.slice(0, 20)} />}
      
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