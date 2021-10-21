 const router = require("express").Router();
 const controller = require("./reviews.controller");
 const methodNotAllowed = require("../errors/methodNotAllowed");

 //Router for delete review
 router
    .route("/:reviewId")
    .put(controller.update)
    .delete(controller.delete)
    .all(methodNotAllowed)

    module.exports = router;