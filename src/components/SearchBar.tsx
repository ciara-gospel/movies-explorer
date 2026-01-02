import { Search as SearchIcon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-sm">
      <input
        type="text"
        placeholder="Search for a movie..."
        className="w-full bg-zinc-900 text-sm border border-white/10 rounded-full py-2.5 pl-11 pr-4 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all shadow-inner"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <SearchIcon 
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" 
        size={18} 
      />
    </form>
  );
};

export default SearchBar;