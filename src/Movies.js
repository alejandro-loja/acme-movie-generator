import React from "react";
import { connect } from "react-redux";
import { createMovie, deleteMovie, updateMovie } from "./store";

const Movies = ({ movies, createMovie, deleteMovie, increment }) => {
  return (
    <div>
      <h1>Movies</h1>
      <button onClick={createMovie}>Create A New Movie</button>
      <ul>
        {movies.map((movie) => {
          return (
            <li key={movie.id}>
              {movie.name}({movie.ranking})
              <button onClick={() => deleteMovie(movie)}>x</button>
              <button onClick={() => increment(movie, -1)}>-</button>
              <button onClick={() => increment(movie, 1)}>+</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
  };
};

const mapDispatch = (dispatch) => {
  return {
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
export default connect(mapStateToProps, mapDispatch)(Movies);
