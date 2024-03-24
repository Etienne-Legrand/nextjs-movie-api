import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "@/components/MovieCard";
import Movie from "@/types/interfaces/Movie";
import Link from "next/link";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("/api/movies");
        const result = response.data;
        setMovies(result.data);
      } catch (error: any) {
        setError(
          `Une erreur s'est produite lors du chargement des films. (${error.message})`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-gray-200 dark:bg-gray-800">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 py-16">
        50 films aléatoires
      </h1>
      <div className="flex flex-wrap justify-center mx-10">
        {movies.map((movie: Movie) => (
          <div key={movie._id} className="m-2">
            <Link href={`/movie/${movie._id}`}>
              <MovieCard movie={movie} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
