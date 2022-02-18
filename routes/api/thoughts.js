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

// /api/thoughts/:id
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(removeThought)

router
    .route('/thoughts/:thoughtId/reactions')
    .post(addReaction)
    .delete(removeReaction)

module.exports = router;