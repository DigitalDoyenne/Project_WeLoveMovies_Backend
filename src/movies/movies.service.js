const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

//Add critic key to /movies/:movieId/reviews response
const addCriticKey = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
});

//Get all movies
function list() {
    return knex("movies")
    .select("*")
};

//Get all movies that are currently showing
function listShowing() {
    return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .distinct("m.*")
    .where({ "mt.is_showing": true })
    .orderBy("m.movie_id")
}

//Get one movie
function read(movieId) {
    return knex("movies")
    .select("*")
    .where({ "movie_id": movieId })
    .first()
};

//Get /movies/:movieId/theaters
function readTheaters(movieId) {
    return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .distinct("t.*")
    .where({ "mt.movie_id": movieId })
};

//Get /movies/:movieId/reviews
function readReviews(movieId) {
    return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ "r.movie_id": movieId })
    .then(reviews => reviews.map(data => addCriticKey(data)));
};

module.exports = {
    list,
    listShowing,
    read,
    readTheaters,
    readReviews,
};