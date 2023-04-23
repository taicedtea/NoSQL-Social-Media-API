const { User, Thought } = require('../models');

model.exports = {
    //gets all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then((thought) => res.json(thought))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    //gets thought by ID
    getThoughtById(req, res) {
        Thought.findOne({_id: req.params.thoughtId})
        .then((thought) => {
            if (!thought) {
                res.status(400).json('No thought found.');
                return;
            } res.json(thought)
        });
    },
    //creates thought to user by ID
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    {_id: body.userId},
                    {$addToSet: {thought: thought._id}},
                );
            })
            .then(data => {
                !data ? res.status(404).json({message: 'No user found'}) :
                res.json(data)
            })
            .catch(err => res.json(err));
    },
    //updates thoughts via ID
    updateThought(req,res) {
        Thought
        .findByIdAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body},
            {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-___v')
        .then(data => {
            !data ? res.status(404).json({message: 'No thoughts with this ID found'}) :
            res.json(data);
        })
        .catch(err => res.status(400).json(err));
    },
    //delete thought by ID
    deleteThought(req, res) {
        Thought
        .findOneAndDelete({_id: req.params.thoughtId})
        .then(data => {
            !data ? res.status(404).json({message: 'No thoughts with this ID found'}) :
            res.json(data);
        })
        .catch(err => res.status(400).json(err))
    },
    //create reaction using thought id
    addThoughtReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$push: {reactions: req.body}},
            {new: true, runValidators: true}
        )
        .populate({path: 'reactions', select: '-__v'})
        .select('-___v')
        .then(data => {
            !data ? res.status(404).json({message: 'No thoughts with this ID found'}) :
            res.json(data);
        })
        .catch(err => res.status(400).json(err));
    },
    //delete reaction using id
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } }},
            { runValidators: true, new: true}
        )
        .then((thought) =>
            !thought ? res.status(400).json({ message: 'No thought found with this id' }) : res.json(thought)
        )
        .catch((err) => res.status(500).json(err))
    },
}