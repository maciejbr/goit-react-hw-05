import { NavLink } from "react-router-dom";
import { useMovies } from "../hooks/useMovies";
import { imageBaseURL } from "../constants/constants";

export default function MovieList() {
  const { list } = useMovies();

  return (
    <div>
      <ul>
        {list.map((movie) => (
          <li key={movie.id} id={movie.id}>
            <NavLink className="movieContainer" to={`/movies/${movie.id}`}>
              {movie.title}
              <img
                className="imgSmall"
                src={`${imageBaseURL}${movie.poster_path}`}
                alt={movie.title}
              />
            </NavLink>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}
