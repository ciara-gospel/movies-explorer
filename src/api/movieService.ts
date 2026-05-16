import api from "./axiosConfig";
import type { TMDBResponse, Movie } from "../types/movie";

export const movieService = {
  getTrending: async (page = 1): Promise<TMDBResponse> => {
    const { data } = await api.get("/trending/movie/week", {
      params: { page },
    });
    return data;
  },

  searchMovies: async (query: string, page = 1): Promise<TMDBResponse> => {
    const { data } = await api.get("search/multi", { params: { query, page } });
    return data;
  },

  getMovieDetails: async (id: string): Promise<Movie> => {
    const { data } = await api.get(`/movie/${id}`);
    return data;
  },

  getSeriesDetails: async (id: string): Promise<Movie> => {
    const { data } = await api.get(`/tv/${id}`);
    return {
      ...data,
      title: data.name,
    };
  },

  getSeasonDetails: async (seriesId: string, seasonNumber: number) => {
    const { data } = await api.get(`/tv/${seriesId}/season/${seasonNumber}`);
    return data;
  },

  getSimilarMovies: async (id: string): Promise<TMDBResponse> => {
    const { data } = await api.get(`/movie/${id}/similar`);
    return data;
  },

  getSimilarSeries: async (id: string): Promise<TMDBResponse> => {
    const { data } = await api.get(`/tv/${id}/similar`);
    const transformedResults = data.results.map((item: any) => ({
      ...item,
      title: item.name,
      media_type: "tv",
    }));
    return { ...data, results: transformedResults };
  },

  getMovies: async (page = 1, sortBy = "popularity.desc"): Promise<TMDBResponse> => {
    const { data } = await api.get("/discover/movie", { 
      params: { 
        page,
        sort_by: sortBy,
        "vote_count.gte": 100
      } 
    });
    return data;
  },

  getSeries: async (page = 1, sortBy = "popularity.desc"): Promise<TMDBResponse> => {
    const { data } = await api.get("/discover/tv", { 
      params: { 
        page,
        sort_by: sortBy 
      } 
    });

    const transformedResults = data.results.map((item: any) => ({
      ...item,
      title: item.name,
      media_type: "tv",
    }));

    return { ...data, results: transformedResults };
  },

  getMoviesByGenre: async (
    genreId: number,
    page = 1
  ): Promise<TMDBResponse> => {
    const { data } = await api.get("/discover/movie", {
      params: {
        with_genres: genreId,
        sort_by: "popularity.desc",
        page,
      },
    });
    return data;
  },
};