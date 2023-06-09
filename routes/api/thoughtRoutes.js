const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addThoughtReaction,
    deleteReaction
} = require('../../controllers/thoughtController')

router
    .route("/")
    .get(getAllThoughts)
    .post(createThought);

router
    .route("/:thoughtId")
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

router
    .route("/:thoughtId/reactions")
    .post(addThoughtReaction);

router
    .route("/:thoughtId/reactions/:reactionsId")
    .delete(deleteReaction);

module.exports = router;
