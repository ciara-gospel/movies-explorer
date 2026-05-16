export interface Movie {
    id: number;
    title: string;
    name?: string;
    overview: string;
    poster_path: string;
    media_type?: 'movie' | 'tv';
    backdrop_path: string;
    release_date: string;
    first_air_date?: string;
    vote_average: number;
    genre_ids: number[];
}

export interface TMDBResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}