import Movie from "@/types/interfaces/Movie";
import React from "react";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie: { title, plot, poster, year, imdb, runtime },
}) => {
  return (
    <div className="grid rounded-3xl max-w-[370px] shadow-sm bg-white dark:bg-gray-600 flex-col">
      <img
        src={poster}
        width="375"
        height="200"
        className="rounded-t-3xl justify-center grid h-80 object-cover"
        alt={title}
      />

      <div className="group p-6 grid z-10">
        <a
          //   href={`${movie.link}`}
          className="group-hover:text-cyan-500 font-bold sm:text-2xl line-clamp-2 text-black dark:text-gray-200"
        >
          {title}
        </a>
        <span className="text-slate-400 pt-2 font-semibold">({year})</span>
        <div className="h-28">
          <span className="line-clamp-4 py-2 text-md text-black dark:text-gray-200">
            {plot}
          </span>
        </div>
        <div className=" grid-cols-2 flex group justify-between">
          <div className="font-black flex flex-col">
            <span className="text-yellow-500 text-xl">Note IMDB</span>
            <span className="text-3xl flex gap-x-1 items-center group-hover:text-yellow-600">
              {imdb?.rating}
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
                    fill="#eab308"
                  />
                </g>
              </svg>
            </span>
          </div>
          <div className="flex flex-col items-end">
            <div className="h-7" />
            {runtime && (
              <span className="text-lg  font-bold  gap-x-2 text-slate-300">
                {Math.floor(runtime / 60)}h {runtime % 60}min
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
