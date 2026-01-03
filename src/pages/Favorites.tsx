import { useMovies } from '../context/MovieContext';
import MovieGrid from '../components/MovieGrid';

const Favorites = () => {
  const { favorites } = useMovies();

  return (
    <div className="pt-8">
      <h1 className="text-3xl font-bold mb-8">My Favorites</h1>
      
      {favorites.length > 0 ? (
        <MovieGrid movies={favorites} />
      ) : (
        <div className="text-center py-20 bg-zinc-900/50 rounded-3xl border border-white/5">
          <p className="text-gray-500 text-lg">You don't have any favorite movies yet.</p>
        </div>
      )}
    </div>
  );
};

export default Favorites;