import { Outlet, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Facebook, Twitter, Instagram, Github, Mail } from 'lucide-react';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <Navbar />
      
      <main className="pt-24 pb-20 px-6 max-w-1600px mx-auto w-full grow">
        <Outlet /> 
      </main>

      <footer className="bg-zinc-950 border-t border-white/5 pt-16 pb-8 px-6">
        <div className="max-w-1600px mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            <div className="space-y-6">
              <Link to="/" className="text-3xl font-black text-red-600 tracking-tighter uppercase">
                Stream <span className="text-white">X</span>
              </Link>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
                Your ultimate destination for the latest movies and series. 
                Experience cinematic excellence from the comfort of your home.
              </p>
              <div className="flex gap-4 text-zinc-400">
                <Facebook size={20} className="hover:text-red-600 cursor-pointer transition" />
                <Twitter size={20} className="hover:text-red-600 cursor-pointer transition" />
                <Instagram size={20} className="hover:text-red-600 cursor-pointer transition" />
                <Github size={20} className="hover:text-red-600 cursor-pointer transition" />
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Explore</h4>
              <ul className="space-y-4 text-zinc-500 text-sm">
                <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                <li><Link to="/movies" className="hover:text-white transition">Movies</Link></li>
                <li><Link to="/series" className="hover:text-white transition">Series</Link></li>
                <li><Link to="/bookmarks" className="hover:text-white transition">My Favorites</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Support</h4>
              <ul className="space-y-4 text-zinc-500 text-sm">
                <li className="hover:text-white cursor-pointer transition">Help Center</li>
                <li className="hover:text-white cursor-pointer transition">Terms of Service</li>
                <li className="hover:text-white cursor-pointer transition">Privacy Policy</li>
                <li className="hover:text-white cursor-pointer transition">Cookie Preferences</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Newsletter</h4>
              <p className="text-zinc-500 text-sm mb-4">Stay updated with our latest releases.</p>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm focus:outline-none focus:border-red-600 transition"
                />
                <button className="absolute right-2 top-1.5 bg-red-600 p-1.5 rounded-md hover:bg-red-700 transition">
                  <Mail size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-zinc-500 text-xs">
              &copy; {new Date().getFullYear()} <span className="font-bold text-zinc-400">STREAM X</span>. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <img 
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" 
                alt="TMDB Logo" 
                className="h-3 opacity-50 hover:opacity-100 transition"
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;