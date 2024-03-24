import axios from "axios";
import Movie from "@/types/interfaces/Movie";
import Comment from "@/types/interfaces/Comment";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function MovieDetail() {
  const router = useRouter();
  const { idMovie } = router.query;
  const [movie, setMovie] = useState({} as Movie);
  const [comments, setComments] = useState([] as Comment[]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      if (!idMovie) return;
      try {
        const response = await axios.get(`/api/movie/${idMovie}`);
        const result = response.data;
        setMovie(result.data);
      } catch (error: any) {
        setError(
          `Une erreur s'est produite lors du chargement du film. (${error.message})`
        );
      } finally {
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      if (!idMovie) return;
      try {
        const response = await axios.get(`/api/movie/${idMovie}/comments`);
        const result = response.data;
        setComments(result.data);
        console.log(result.data);
      } catch (error: any) {
        setError(
          `Une erreur s'est produite lors du chargement des commentaires. (${error.message})`
        );
      }
    };

    fetchMovies();
    fetchComments();
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <Link
        href="/movies"
        className="bg-gray-800 text-white px-4 py-2 rounded-md mb-8 inline-block"
      >
        Retour
      </Link>
      <div className="flex">
        <img src={movie?.poster} alt={movie?.title} className="w-96" />
        <div className="ml-24">
          <h2 className="text-4xl font-semibold">{movie?.title}</h2>
          <p className="mt-4 text-gray-600">{movie?.fullplot}</p>
          {list("Genres", movie.genres)}
          {list("Languages", movie.languages)}
          {list("Directors", movie.directors)}
          {list("Cast", movie.cast)}
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-4xl font-semibold">Comments</h2>

        {comments.length === 0 ? (
          <p className="ms-1 mt-2">Aucun commentaire</p>
        ) : (
          comments.map((comment, index) => (
            <div
              key={index}
              className="mt-4 text-gray-600 rounded-lg border-2 border-gray-200 p-4"
            >
              <p>{comment.text}</p>
              <p className="mt-2 text-gray-400">- {comment.name}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );

  function list(title: string, items: string[]) {
    return (
      <div className="mt-12">
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="mt-2 text-gray-600">{items?.join(", ")}</p>
      </div>
    );
  }
}
