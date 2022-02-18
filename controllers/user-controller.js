const { Users } = require('../models');

const userController = {
  // get all Users
  getAllUsers(req, res) {
    Users.find({})
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one User by id
  getUserById({ params }, res) {
    Users.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .populate({
          path:'friends',
          select:'-__v'
      })
      .select('-__v')
      .then(dbUsersData => res.json(dbUsersData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // createUsers
  createUsers({ body }, res) {
    Users.create(body)
      .then(dbUsersData => res.json(dbUsersData))
      .catch(err => res.json(err));
  },

  // update Users by id
  updateUsers({ params, body }, res) {
    Users.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbUsersData => {
        if (!dbUsersData) {
          res.status(404).json({ message: 'No Users found with this id!' });
          return;
        }
        res.json(dbUsersData);
      })
      .catch(err => res.json(err));
  },

  // delete Users
  deleteUsers({ params }, res) {
    Users.findOneAndDelete({ _id: params.id })
      .then(dbUsersData => res.json(dbUsersData))
      .catch(err => res.json(err));
  },
  removeFriend({ params }, res) {
    console.log(params)

    Users.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.friendId  } },
      { new: true, runValidators: true }
    )
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },
  addFriend({ params }, res) {
    console.log(params)
    Users.findOneAndUpdate(
      { _id: params.id },
      { $push: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  }
};

module.exports = userController;
