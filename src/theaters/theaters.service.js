const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

//Helper function to reduce movies properties to add to response
const reduceProps = reduceProperties("theater_id", {
    movie_id: ["movies", null, "movie_id"],
    title: ["movies", null, "title"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
    rating: ["movies", null, "rating"],
    description: ["movies", null, "description"],
    image_url: ["movies", null, "image_url"],
  });

//Handler for get all theaters
const list = () => {
    return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .distinct("*")
    .then(reduceProps)
};

module.exports = {
    list,
};