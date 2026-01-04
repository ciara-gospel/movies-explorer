import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Home, Film, Tv, User, Menu, X } from 'lucide-react';
import SearchBar from './SearchBar';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={20} /> },
    { name: 'Movies', path: '/movies', icon: <Film size={20} /> },
    { name: 'Series', path: '/series', icon: <Tv size={20} /> },
    { name: 'Favorites', path: '/favorites', icon: <Bookmark size={20} /> },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-100 bg-black/90 backdrop-blur-lg border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-black text-red-600 tracking-tighter uppercase shrink-0">
          Stream <span className="text-white">X</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className="hover:text-white flex items-center gap-2 transition">
              {link.icon} {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          <div className="hidden sm:block">
            <SearchBar />
          </div>
          
          <button 
            onClick={toggleMenu}
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      <div className={`fixed inset-0 z-110 bg-black/95 transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full p-8">
          <div className="flex justify-between items-center mb-12">
            <span className="text-2xl font-black text-red-600 uppercase">Menu</span>
            <button onClick={toggleMenu} className="text-white p-2 bg-white/10 rounded-full">
              <X size={24} />
            </button>
          </div>

          <div className="mb-10 sm:hidden">
            <SearchBar />
          </div>

          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                onClick={toggleMenu}
                className="text-2xl font-bold text-gray-400 hover:text-white flex items-center gap-4 transition border-b border-white/5 pb-4"
              >
                <span className="text-red-600">{link.icon}</span>
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;