import { Suspense, useEffect } from "react";
import { useMovies } from "../hooks/useMovies";
import Loading from "../components/Loading";
import { lazy } from "react";
const MovieList = lazy(() => import("../components/MovieList"));

export default function HomePage() {
  const { list, setFilterQuery } = useMovies();

  useEffect(() => {
    setFilterQuery("");
  }, [setFilterQuery]);

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <h2>Trending today</h2>
        <MovieList list={list} />
      </Suspense>
    </div>
  );
}
