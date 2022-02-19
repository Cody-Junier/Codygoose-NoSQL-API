const router = require('express').Router();
const {
  getAllthoughts,
  getThoughtById,
  addThought,
  updateThought,
  removeThought,
  removeReaction,
  addReaction
} = require('../../controllers/thought-controller');

// /api/thoughts
router
  .route('/')
  .get(getAllthoughts)
  .post(addThought);

  router
    .route('/:thoughtId/reactions')
    .post(addReaction)
    router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction)

// /api/thoughts/:id
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(removeThought)


module.exports = router;