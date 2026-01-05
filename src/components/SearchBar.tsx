import { Search as SearchIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim().length > 0) {
        navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    }, 200);

    return () => clearTimeout(delayDebounceFn);
  }, [query, navigate]);

  return (
    <div className="relative w-full max-w-sm group">
      <input
        type="text"
        placeholder="Search for a movie..."
        className="w-full bg-zinc-900 text-sm border border-white/10 rounded-full py-2.5 pl-11 pr-4 
                   focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 
                   transition-all shadow-inner group-focus-within:bg-zinc-800"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <SearchIcon 
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-600 transition-colors" 
        size={18} 
      />
    </div>
  );
};

export default SearchBar;