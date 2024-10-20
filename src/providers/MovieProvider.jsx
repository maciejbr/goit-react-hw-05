import { useEffect, useState } from "react";
import {
  fetchCast,
  fetchData,
  fetchReviews,
  fetchSearch,
} from "../utils/fetchData";
import MovieContext from "../context/MovieContext";

export default function MovieProvider({ children }) {
  const [list, setList] = useState([]);
  const [listFiltred, setListFiltred] = useState([]);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [movieId, setMovieId] = useState(null);
  const [filterQuery, setFilterQuery] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const movies = await fetchData();
        setList(movies);
      } catch (error) {
        console.error("Błąd podczas pobierania danych Data:", error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (filterQuery) {
      const getData = async () => {
        try {
          const moviesFiltred = await fetchSearch(filterQuery);
          setListFiltred(moviesFiltred);
        } catch (error) {
          console.error("Błąd podczas pobierania danych Search:", error);
        }
      };
      getData();
    } else {
      setListFiltred([]);
    }
  }, [filterQuery]);
  // console.log(listFiltred);

  useEffect(() => {
    if (movieId) {
      const getDataCast = async () => {
        try {
          const moviesCast = await fetchCast(movieId);
          setCast(moviesCast);
        } catch (error) {
          console.error("Błąd podczas pobierania danych Cast:", error);
        }
      };
      getDataCast();
    }
  }, [movieId]);
  // console.log(cast);

  useEffect(() => {
    if (movieId) {
      const getDataReviews = async () => {
        try {
          const moviesReviews = await fetchReviews(movieId);
          setReviews(moviesReviews);
        } catch (error) {
          console.error("Błąd podczas pobierania danych Reviews:", error);
        }
      };
      getDataReviews();
    }
  }, [movieId]);
  // console.log(reviews);

  return (
    <MovieContext.Provider
      value={{
        list,
        listFiltred,
        cast,
        reviews,
        setMovieId,
        setFilterQuery,
        setListFiltred,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}
