const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

//Router for /movies
router
    .route("/")
    .get(controller.list)
    .all(methodNotAllowed)

//Router for /movies/:movieId
router
    .route("/:movieId")
    .get(controller.read)
    .all(methodNotAllowed)

//Router for /movies/:movieId/theaters
router
    .route("/:movieId/theaters")
    .get(controller.read)
    .all(methodNotAllowed)

//Router for /movies/:movieId/reviews
router
    .route("/:movieId/reviews")
    .get(controller.read)
    .all(methodNotAllowed)

module.exports = router;