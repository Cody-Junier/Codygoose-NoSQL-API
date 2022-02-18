const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUsers,
  updateUsers,
  deleteUsers,
  addFriend,
  removeFriend
} = require('../../controllers/user-controller');

// /api/users
router
  .route('/')
  .get(getAllUsers)
  .post(createUsers);

// /api/users/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUsers)
  .delete(deleteUsers);

// /api/users/:id/friends/:friendId
router
    .route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend)

module.exports = router;
