import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MovieProvider } from './context/MovieContext';
import MainLayout from './layouts/MainLayout';

import Home from './pages/Home';
import Search from './pages/Search';
import MovieDetails from './pages/MovieDetails';
import Favorites from './pages/Favorites'; 
import Movies from './pages/Movies';
import Series from './pages/Series';

function App() {
  return (
    <MovieProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="movies" element={<Movies />} />
            <Route path="series" element={<Series />} />
            <Route path="search" element={<Search />} />
            <Route path="movie/:id" element={<MovieDetails />} />
            <Route path="favorites" element={<Favorites />} />
          </Route>
        </Routes>
      </Router>
    </MovieProvider>
  );
}

export default App;