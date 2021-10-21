const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//Validation functions

//If is_showing = true
const isShowing = (req, res, next) => {
  if (req.query.is_showing && req.query.is_showing !== "true") {
    next({
      status: 400,
      message: "Invalid request query.",
    });
  }
  next();
};

//If the movie exists; determines which function to call based on the query
const movieExists = async (req, res, next) => {
  const { movieId } = req.params;
  let foundMovie;
  req.originalUrl.includes("theaters")
    ? (foundMovie = await moviesService.readTheaters(movieId))
    : req.originalUrl.includes("reviews")
    ? (foundMovie = await moviesService.readReviews(movieId))
    : (foundMovie = await moviesService.read(movieId));

  if (foundMovie) {
    res.locals.movie = foundMovie;
    next();
  }

  next({
    status: 404,
    message: "Movie cannot be found.",
  });
};

//Handler functions

//Get all movies or all movies that are currently showing
const list = async (req, res, next) => {
  return req.query.is_showing && req.query.is_showing === "true"
    ? res.json({ data: await moviesService.listShowing() })
    : res.json({ data: await moviesService.list() });
};

//Read movie at /movies/:movieId
const read = async (req, res, next) => {
  res.json({ data: res.locals.movie });
};

module.exports = {
  list: [isShowing, asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
};
