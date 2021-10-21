const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//Validation Functions

//Check if the review exists
const reviewExists = async (req, res, next) => {
    const { reviewId } = req.params;
    const review = await reviewsService.read(reviewId)
    if (review) {
        res.locals.review = review;
        return next()
     }
     next({
        status: 404,
        message: "Review cannot be found."
    })
};

//Check if req.body has content or score
const bodyIsValid = (req, res, next) => {
    const validProperties = [
        "content",
        "score"
    ];
    const { data = {} } = req.body;
    const invalidProperties = Object.keys(data).filter(property => !validProperties.includes(property));

    if (invalidProperties.length) next({
        status: 400,
        message: "Invalid properties"
    })
    next()
};

//Handler Functions

//Update /reviews/:reviewId
const update = async (req, res, next) => {
    const review_id = res.locals.review.review_id;
    const updatedReview = {
        ...req.body.data,
        review_id,
    }
    await reviewsService.update(updatedReview)
    res.json({ data: await reviewsService.readUpdatedReview(review_id) })
}

//Delete /reviews/:reviewId
const destroy = async (req, res, next) => {
    await reviewsService.delete(res.locals.review.review_id)
    res.sendStatus(204)
};

module.exports = {
    update: [asyncErrorBoundary(reviewExists), bodyIsValid, asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)]
};