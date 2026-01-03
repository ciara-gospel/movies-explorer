import { useEffect, useState } from 'react';
import type { Movie } from '../types/movie';
import { movieService } from '../api/movieService';
import MovieCard from './MovieCard';

interface MovieRowProps {
  title: string;
  genreId: number;
}

const MovieRow = ({ title, genreId }: MovieRowProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    movieService.getMoviesByGenre(genreId).then(data => setMovies(data.results));
  }, [genreId]);

  return (
    <div className="my-12">
      <h2 className="text-2xl md:text-3xl font-black mb-6 px-2 border-l-4 border-red-600 pl-4 uppercase tracking-tighter">
        {title}
      </h2>

      <div 
        className="flex gap-4 md:gap-6 overflow-x-auto pb-6 cursor-grab active:cursor-grabbing
                   scrollbar-thin scrollbar-track-white/5 scrollbar-thumb-red-600/50 hover:scrollbar-thumb-red-600"
      >
        {movies.map(movie => (
          <div 
            key={movie.id} 
            className="w-[130px] md:w-[280px] shrink-0 transition-transform duration-300 hover:scale-105"
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieRow;