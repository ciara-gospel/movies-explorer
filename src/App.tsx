import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { MovieProvider } from './context/MovieContext';
// import Home from './pages/Home';

function App() {
  return (
    // <MovieProvider>
      <Router>
        <div className="min-h-screen bg-[#0F1014] text-white">
          {/* Navbar ici */}
          <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/movie/:id" element={<div>Details</div>} />
            <Route path="/bookmarks" element={<div>Favorites</div>} />
          </Routes>
        </div>
      </Router>
    // </MovieProvider>
  );
}

export default App;