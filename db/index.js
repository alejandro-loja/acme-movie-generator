const Sequelize = require("sequelize");
const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/acme_movies_db"
);

const { STRING, INTEGER } = Sequelize;

const Movie = conn.define("movie", {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  ranking: {
    type: INTEGER,
    defaultValue: 3,
  },
});

module.exports = {
  conn,
  Movie,
};
