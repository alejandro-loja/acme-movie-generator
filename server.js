const express = require("express");
const app = express();
const path = require("path");
const { conn, Movie } = require("./db");

app.use("/dist", express.static("dist"));
app.use("/assets", express.static("assets"));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send({ err });
});

app.get("/api/movies", async (req, res, next) => {
  try {
    res.send(await Movie.findAll());
  } catch (ex) {
    next(ex);
  }
});

app.post("/api/movies", async (req, res, next) => {
  try {
    res.status(201).send(await Movie.create(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.put("/api/movies/:id", async (req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    await movie.update(req.body);
    res.send(movie);
  } catch (ex) {
    next(ex);
  }
});

app.delete("/api/movies/:id", async (req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    await movie.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

const init = async () => {
  try {
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`));

    await conn.sync({ force: true });
    const movies = await Promise.all(
      ["Spider-man 1", "Fargo", "Batman Begins", "Monsters Inc."].map((name) =>
        Movie.create({ name })
      )
    );
  } catch (ex) {
    console.log(ex);
  }
};

init();
