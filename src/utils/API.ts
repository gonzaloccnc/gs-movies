export const API_URL = {
  IMAGES_W: 'https://image.tmdb.org/t/p/w500',
  IMAGES: 'https://image.tmdb.org/t/p/original',
  MOVIES: 'https://api.themoviedb.org/3/movie/'
}

export interface MoviePlay {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: number
  type: string
  official: boolean
  published_at: string
  id: string
}

export interface MoviePlayJSON {
  id: number
  results: MoviePlay[]
}

export interface MovieType {
  id: number
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface MoviesJSON {
  page: number
  total_pages: number
  total_results: number
  results: MovieType[]
}

export interface Productioncountry {
  iso_3166_1: string
  name: string
}

export interface Productioncompany {
  id: number
  logo_path?: any
  name: string
  origin_country: string
}

export interface Genre {
  id: number
  name: string
}

export interface LatestMovie {
  adult: boolean
  backdrop_path?: any
  belongs_to_collection?: any
  budget: number
  genres: Genre[]
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: Productioncompany[]
  production_countries: Productioncountry[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: any[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}
