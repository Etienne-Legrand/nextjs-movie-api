import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "@/components/MovieCard";
import Movie from "@/types/interfaces/Movie";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get("/api/movies");
      setMovies(response.data.data);
    };

    fetchMovies();
  }, []);

  return (
    <div className="bg-gray-200 dark:bg-gray-800 h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 py-16">
        50 films aléatoires
      </h1>
      <div className="flex flex-wrap justify-center mx-10">
        {movies.map((movie: Movie) => (
          <div key={movie._id} className="m-2">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
