import React from "react";
import { connect } from "react-redux";
import { createMovie, deleteMovie, updateMovie } from "./store";
import { faker } from "@faker-js/faker";

const Movies = ({ movies, createMovie, deleteMovie, increment, average }) => {
  return (
    <div>
      <h1>Movies</h1>
      <h2>The average rating is ({average})</h2>
      <button onClick={createMovie}>Create A New Movie</button>
      <ul>
        {movies.map((movie) => {
          return (
            <li key={movie.id}>
              {movie.name}({movie.ranking})
              <button onClick={() => deleteMovie(movie)}>x</button>
              <button
                disabled={movie.ranking <= 1 && true}
                onClick={() => increment(movie, -1)}
              >
                -
              </button>
              <button
                disabled={movie.ranking >= 5 && true}
                onClick={() => increment(movie, 1)}
              >
                +
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  let average = 0;
  const arrayOfNumbers = state.movies.map((movie) => movie.ranking);

  average = arrayOfNumbers.reduce((avg, value, _, { length }) => {
    return avg + value / length;
  }, 0);

  average = average.toFixed(2);
  return {
    movies: state.movies,
    average,
  };
};

const mapDispatch = (dispatch) => {
  return {
    createMovie: () => {
      dispatch(createMovie({ name: faker.company.companyName() }));
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
