import React, {createContext, useContext, useState, useEffect} from "react";
import type { Movie } from "../types/movie";

interface MovieContextType {
    favorites: Movie[];
    toggleFavorite: (movie: Movie) => void;
    isFavorite: (id: number) => boolean;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [favorites, setFavorites] = useState<Movie[]>(() => {
        const saved = localStorage.getItem('movie_bookmarks');
        return saved? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('movie_bookmarks', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (movie: Movie) => {
        setFavorites(prev => 
            prev.find(m => m.id === movie.id)
            ? prev.filter(m => m.id !== movie.id)
            : [...prev, movie]
        );
    };

    const isFavorite = (id: number) => favorites.some(m => m.id === id);

    return (
        <MovieContext.Provider value={{ favorites, toggleFavorite, isFavorite}}>
            {children}
        </MovieContext.Provider>
    );
};

export const useMovies = () => {
    const context = useContext(MovieContext);
    if (!context) throw new Error('useMovies must be used within MovieProvider');
    return context;
};