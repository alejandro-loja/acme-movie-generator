import { createRoot } from "react-dom/client";
import React, { Component } from "react";
import { Provider, connect } from "react-redux";
import Movies from "./Movies";
// import { HashRouter as Router, Route } from "react-router-dom";

import store, {
  fetchMovies,
  createMovie,
  deleteMovie,
  updateMovie,
} from "./store";

class _App extends Component {
  componentDidMount() {
    this.props.fetchMovies();
  }
  render() {
    return (
      <div>
        <Movies />
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchMovies: () => dispatch(fetchMovies()),
    createMovie: () => {
      dispatch(createMovie({ name: Math.random() }));
    },
    increment: (movie, dir) => {
      movie = { ...movie, ranking: movie.ranking + dir };
      dispatch(updateMovie(movie));
    },
    deleteMovie: async (movie) => {
      dispatch(deleteMovie(movie));
    },
  };
};

const App = connect(null, mapDispatch)(_App);

const root = createRoot(document.querySelector("#root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
