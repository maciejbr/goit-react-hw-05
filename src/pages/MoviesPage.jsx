import { useEffect, useState } from "react";
import { useMovies } from "../hooks/useMovies";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { setActive } from "../utils/setActive";
import { imageBaseURL } from "../constants/constants";
import Loading from "../components/Loading";

export default function MoviesPage() {
  const [query, setQuery] = useState("");
  const [searchMade, setSearchMade] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { listFiltred, setFilterQuery, setListFiltred } = useMovies();

  const sortedMovies = listFiltred.toSorted(
    (a, b) => new Date(b.release_date) - new Date(a.release_date)
  );

  const handlesubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setFilterQuery(query);
    console.log(query);
    setSearchMade(true);
    navigate(`/movies?query=${encodeURIComponent(query)}`, {
      state: { from: location },
    });
  };
  // console.log("z MP Current location:", location);
  // console.log("z MP List filtred ", listFiltred);
  // console.log("z MP Sorted movies ", sortedMovies);
  // console.log("z MP list:", list);

  const handleClear = () => {
    setQuery("");
    setSearchMade(false);
    setListFiltred([]);
    setFilterQuery("");
    navigate("/movies");
  };

  useEffect(() => {
    if (listFiltred.length > 0 || searchMade) {
      setLoading(false);
    }
  }, [listFiltred, searchMade]);

  return (
    <>
      <div className="formSearch">
        <form onSubmit={handlesubmit}>
          <input
            type="text"
            name="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a movie..."
          ></input>
          <button type="submit" className="btn">
            Search
          </button>
          <button type="button" className="btn" onClick={handleClear}>
            Clear
          </button>
        </form>
      </div>
      <div>
        {loading ? (
          <Loading />
        ) : searchMade && sortedMovies.length === 0 ? (
          <h4>Sorry. No movies found to your query!</h4>
        ) : (
          <ul>
            {sortedMovies.map((movie) => (
              // console.log("Movie ID:", movie.id);
              <li key={movie.id} id={movie.id}>
                <NavLink
                  className={`${setActive} movieContainer`}
                  to={`/movies/${movie.id}`}
                  state={{ from: location }}
                >
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
        )}
      </div>
    </>
  );
}
