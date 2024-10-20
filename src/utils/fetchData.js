import axios from "axios";
import { API_KEY } from "../constants/constants";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
const params = {
  page: 1,
  api_key: API_KEY,
};

export const fetchData = async () => {
  try {
    const response = await axios.get(`trending/movie/day`, { params });
    // console.log("Data, all movies: ", response.data.results);
    return response.data.results;
  } catch (error) {
    console.error("Błąd podczas pobierania danych fetchData: ", error);
    return [];
  }
};

export const fetchCast = async (movie_id) => {
  try {
    const response = await axios.get(`movie/${movie_id}/credits`, { params });
    // console.log("Cast: ", movie_id, response.data.cast);
    return response.data.cast;
  } catch (error) {
    console.error("Błąd podczas pobierania danych fetchCast: ", error);
    return [];
  }
};

export const fetchReviews = async (movie_id) => {
  try {
    const response = await axios.get(`movie/${movie_id}/reviews`, { params });
    // console.log("Reviews for ID: ", movie_id, response.data.results);
    return response.data.results;
  } catch (error) {
    console.error("Błąd podczas pobierania danych fetchReviews: ", error);
    return [];
  }
};

export const fetchSearch = async (query = "") => {
  try {
    const updatedParams = { ...params, query };
    const response = await axios.get(`search/movie`, {
      params: updatedParams,
    });
    console.log("Updated params: ", updatedParams);
    console.log("query: ", query);

    console.log("Data, for search: ", query, response.data.results);
    const englishMovies = response.data.results.filter(
      (movie) => movie.original_language === "en"
    );

    console.log("Movies in English: ", englishMovies);
    return englishMovies;
  } catch (error) {
    console.error("Błąd podczas pobierania danych fetchSearch: ", error);
    return [];
  }
};
