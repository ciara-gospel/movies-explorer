import { Link } from 'react-router-dom';
import { Bookmark, Home, Film, Tv, User } from 'lucide-react';
import SearchBar from './SearchBar';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-2xl font-black text-red-600 tracking-tighter uppercase shrink-0">
        Stream <span className="text-white">X</span>
      </Link>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
        <Link to="/" className="hover:text-white flex items-center gap-2 transition">
          <Home size={18} /> Home
        </Link>
        <Link to="/movies" className="hover:text-white flex items-center gap-2 transition">
          <Film size={18} /> Movies
        </Link>
        <Link to="/series" className="hover:text-white flex items-center gap-2 transition">
          <Tv size={18} /> Series
        </Link>
        <Link to="/favorites" className="hover:text-white flex items-center gap-2 transition">
          <Bookmark size={18} /> Favorites
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:block">
          <SearchBar />
        </div>
        
        <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center border border-white/10 cursor-pointer hover:bg-zinc-700 transition">
          <User size={20} className="text-gray-300" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;