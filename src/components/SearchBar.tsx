import { Search as SearchIcon, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (!location.pathname.startsWith('/search')) {
      setQuery('');
    }
  }, [location.pathname]);

  useEffect(() => {
    const isInsideSearchOrHome = 
      location.pathname === '/' || 
      location.pathname.startsWith('/search');

    if (debouncedQuery.trim().length > 0 && isInsideSearchOrHome) {
      navigate(`/search?q=${encodeURIComponent(debouncedQuery.trim())}`);
    }
  }, [debouncedQuery, navigate, location.pathname]);

  return (
    <div className="relative w-full max-w-sm group">
      <input
        type="text"
        placeholder="Search for a movie..."
        className="w-full bg-zinc-900 text-sm border border-white/10 rounded-full py-2.5 pl-11 pr-10 
                   focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 
                   transition-all shadow-inner group-focus-within:bg-zinc-800"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <SearchIcon 
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-600 transition-colors" 
        size={18} 
      />
      {query && (
        <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
          <X size={16} className="text-gray-500 hover:text-white" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;