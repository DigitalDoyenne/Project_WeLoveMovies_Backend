const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties")

//Helper Functions

//Add critic key to update /reviews/:reviewId response
const addCriticKey = mapProperties({
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
});

//Read updated review
const readUpdatedReview = (reviewId) => {
    return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("*")
    .where({ "review_id": reviewId })
    .first()
    .then(addCriticKey)
};

//Handler Functions

//Read review at /reviews/:reviewId
const read = (reviewId) => {
    return knex("reviews")
    .select("*")
    .where({ "review_id": reviewId })
    .first();
}

//Update /reviews/:reviewId
const update = (updatedReview) => {
    return knex("reviews")
    .where({ "review_id": updatedReview.review_id })
    .update(updatedReview, "*")
};

//Delete /reviews/:reviewId
const destroy = (reviewId) => {
    return knex("reviews")
    .where({ "review_id": reviewId })
    .del()
 };

 module.exports = {
     readUpdatedReview,
     read,
     update,
     delete: destroy,
 }