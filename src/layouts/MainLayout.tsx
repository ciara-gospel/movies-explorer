import { Outlet, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Linkedin, Github, Mail, } from 'lucide-react';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <Navbar />
      
      <main className="pt-24 pb-20 px-6 max-w-[1600px] mx-auto w-full grow">
        <Outlet /> 
      </main>

      <footer className="bg-zinc-950 border-t border-white/5 pt-16 pb-8 px-6">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
            
            <div className="space-y-6">
              <Link to="/" className="text-3xl font-black text-red-600 tracking-tighter uppercase">
                Stream <span className="text-white">X</span>
              </Link>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
                Your ultimate destination for the latest movies and series. 
                Experience cinematic excellence from the comfort of your home.
              </p>
              
              <div className="flex gap-4 text-zinc-400">
                <a 
                  href="https://github.com/ciara-gospel?tab=repositories" // Remplace par ton lien
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-red-600 transition duration-300"
                >
                  <Github size={20} />
                </a>
                <a 
                  href="https://www.linkedin.com/in/ologuie-arlette-078397355/" // Remplace par ton lien
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-red-600 transition duration-300"
                >
                  <Linkedin size={20} />
                </a>
                <a 
                  href="mailto:arletteologuie@gmail.com"
                  className="hover:text-red-600 transition duration-300"
                >
                  <Mail size={20} />
                </a>
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

          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-zinc-500 text-xs text-center md:text-left">
              &copy; {new Date().getFullYear()} <span className="font-bold text-zinc-400">STREAM X</span>. 
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;