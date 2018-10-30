import React, { Component } from "react";
import "./App.css";
import { MovieResponse } from "./models/movieResponse";
import { Movie } from "./Movie";

const initialState = {
  movies: [] as MovieResponse[]
};
type State = Readonly<typeof initialState>;

class App extends Component<object, State> {
  readonly state: State = initialState;

  componentDidMount() {
    let dataURL = "http://localhost/wp-json/wp/v2/movies?_embed";
    fetch(dataURL)
      .then(res => res.json())
      .then(res => {
        this.setState({
          movies: res
        });
      });
  }

  render() {
    let movies = this.state.movies.map(movie => <Movie movie={movie} />);

    return (
      <div>
        <h2>Star Wars Movies</h2>
        {movies}
      </div>
    );
  }
}

export default App;
