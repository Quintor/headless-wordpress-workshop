import { SFC } from "react";
import { MovieResponse } from "./models/movieResponse";

type Props = { movie: MovieResponse };

export const Movie: SFC<Props> = ({ movie }) => (
  <div key={movie.id}>
    <img
      src={
        movie._embedded["wp:featuredmedia"][0].media_details.sizes.large
          .source_url
      }
    />
    <p>
      <strong>Title:</strong> {movie.title.rendered}
    </p>
    <p>
      <strong>Release Year:</strong> {movie.acf.release_year}
    </p>
    <p>
      <strong>Rating:</strong> {movie.acf.rating}
    </p>
    <div>
      <strong>Description:</strong>
      <div dangerouslySetInnerHTML={{ __html: movie.acf.description }} />
    </div>
  </div>
);
