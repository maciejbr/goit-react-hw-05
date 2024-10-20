import { NavLink } from "react-router-dom";
import { setActive } from "../utils/setActive";
import NavigationBack from "./NavigationBack";
import { useMovies } from "../hooks/useMovies";

export default function Navigation() {
  const { setFilterQuery, setListFiltred } = useMovies();

  const handleClear = () => {
    setQuery("");
    setSearchMade(false);
    setListFiltred([]);
    setFilterQuery("");
  };

  return (
    <nav className="navPage header">
      <NavLink className={`{setActive} btn`} to="/">
        Home
      </NavLink>
      <NavLink className={`{setActive} btn`} to="/movies" onClick={handleClear}>
        Movies
      </NavLink>
      <NavigationBack />
    </nav>
  );
}
