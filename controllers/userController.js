const { User, Thought } = require('../models');

module.exports = {
    //gets all users
    getAllUsers(req, res) {
        User.find()
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err))
    },
    //get user by ID
    getUserByID(req, res) { 
        User
            .findOne({_id: req.params.userId})
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
    // createUser(req, res) {
    //     User.findOneAndUpdate({_id})
    // }
    //deletes user by ID
    deleteUser(req, res) {
        User
            .findOneAndDelete({_id: req.params.userId})
            .then((user) => {
                !user ? res.status(404).json({message: 'No user found'}) :
                res.json(user);
            })
            .catch(err = res.status(400).json(err));
    }
}