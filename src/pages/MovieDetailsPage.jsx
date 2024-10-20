import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useMovies } from "../hooks/useMovies";
import { useParams } from "react-router-dom";
import { genreMap, imageBaseURL } from "../constants/constants";
import { setActive } from "../utils/setActive";

export default function MovieDetailsPage() {
  const { list, listFiltred, setMovieId } = useMovies();
  const { movieId } = useParams();
  console.log("movieId from URL:", movieId);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (movieId) {
      setMovieId(movieId);
    }
  }, [movieId, setMovieId]);

  useEffect(() => {
    if (listFiltred.length !== 0) {
      const foundMovieFiltred = listFiltred.find(
        (movie) => movie.id === parseInt(movieId)
      );
      setMovie(foundMovieFiltred);
    } else {
      const foundMovie = list.find((movie) => movie.id === parseInt(movieId));
      setMovie(foundMovie);
    }
  }, [list, listFiltred, movieId]);

  // console.log("z MDP list:", list);
  console.log("z MDP listFiltred:", listFiltred);
  // console.log("z MDP movieId:", movieId);

  if (!movie) {
    return <h4>Sorry. Movie not found 111!</h4>;
  }

  if (!movieId) {
    return <h4>Sorry. Movie no movie found 222!</h4>;
  }

  return (
    <>
      <div className="movieDetailsPage">
        <div className="movieImage">
          <img src={`${imageBaseURL}${movie.poster_path}`} alt={movie.title} />
        </div>
        <div className="movieDescr">
          <h2>{movie.title}</h2>
          <br />
          <p>
            <span className="strong">Release Date: </span>
            {movie.release_date}
          </p>
          <p>
            <span className="strong">Average Vote: </span> {movie.vote_average}
          </p>
          <p>
            <span className="strong">Genres: </span>
            {movie.genre_ids.map((id) => genreMap[id]).join(", ")}
          </p>
          <br />
          <p>
            <span className="strong">Overview: </span>
            {movie.overview}
          </p>
          <br />
          <p>
            <span className="strong">Additional information:</span>
          </p>
          <div className="addDescr">
            <NavLink className={`{setActive} btn`} to="cast">
              Cast
            </NavLink>
            <NavLink className={`{setActive} btn`} to="reviews">
              Reviews
            </NavLink>
          </div>
          <br />
          <Outlet />
        </div>
      </div>
    </>
  );
}
