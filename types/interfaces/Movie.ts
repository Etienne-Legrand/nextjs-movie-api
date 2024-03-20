interface Movie {
  _id: string;
  plot: string;
  genres: string[];
  runtime: number;
  cast: string[];
  num_mflix_comments: number;
  title: string;
  fullplot: string;
  languages: string[];
  released: Date;
  directors: string[];
  rated: string;
  awards: {
    wins: number;
    nominations: number;
    text: string;
    lastupdated: string;
    year: number;
  };
  imdb: {
    rating: number;
    votes: number;
    id: number;
  };
  countries: string[];
  tomatoes: {
    viewer: {
      rating: number;
      numReviews: number;
      meter: number;
      lastUpdated: Date;
    };
  };
}
