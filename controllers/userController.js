const { User, Thought } = require('../models');

module.exports = {
    //gets all users
    getAllUsers(req, res) {
        User.find()
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err))
    },
    //get user by ID
    getUserById(req, res) { 
        User.findOne({_id: req.params.userId})
            .populate({path: 'thought', select:'-__v' })
            .populate({path: 'friends', select:'-__v' })
            .populate('-__v')
            .then((user) => {
                !user ? res.status(400).json({message: 'No user found with this ID'}) :
                res.json(user)
            })
            .catch((err) => res.status(500).json(err));
    },
    //create user
    createUser({body}, res) {
        User.create(body)
            .then(data => res.json(data))
            .catch(err => res.status(400).json(err));

    },
    //updates user by ID
    updateUser(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$set: req.body},
            {runValidators: true, new: true}
        )
        .then((user) => {
            !user ? res.status(400).json({message: 'user not found'}) :
            res.json(user)
        })
        .catch(err => res.status(400).json(err))
    },
    //deletes user by ID
    deleteUser(req, res) {
        User.findOneAndDelete({_id: req.params.userId})
            .then((user) => {
                !user ? res.status(404).json({message: 'No user found'}) :
                res.json(user);
            })
            .catch(err = res.status(400).json(err));
    },
    //add friend
    addFriend(req, res) {
        User.findOneAndUpdate (
            {_id: req.params.userId},
            {$push: {friends: req.params.friendId}},
            {runValidators: true, new: true}
        )
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(data => {
            !data ? res.status(404).json({message: 'No user found'}) :
            res.json(DataTransfer)
        })
        .catch(err => res.json(err));
    },
    //delete friend
    deleteFriend(req, res) {
        User.findOneAndUpdate (
            {_id: req.params.userId},
            {$pull: {friends: req.params.friendId}},
            {runValidators: true, new: true}
        )
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(data => {
            !data ? res.status(404).json({message: 'No user found'}) :
            res.json(DataTransfer)
        })
        .catch(err => res.json(err));
    }
}