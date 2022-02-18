const {Schema, model, Types} = require('mongoose');
const dateFormat = require('./utils/dateFormat');

const ReactionSchema = new Schema({
    reactionId:{
        type: Schema.Types.ObjectId,
        default: ()=> new Types.ObjectId()
    },
    reactionBody:{
        type: String,
        required: true,
        maxlength: 280
    },
    username:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now,
        get:(createdAtVal) => dateFormat(createdAtVal)
    },
},
{
    toJSON:{
        getters: true
    },
    id: false
})

const ThoughtSchema = new Schema({
    thoughtId:{
        type: Schema.Types.ObjectId,
        default: ()=> new Types.ObjectId()
    },
    thoughtText:{
        type: String,
        required: true,
        minLength: 1,
        maxlength: 280
    },
    createdAt:{
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username:{
        type: String,
        required: true
    },
    reactions:[ReactionSchema]
},
{
    toJSON:{
        virtuals: true,
        getters: true
    },
    id: false
}
)
const Thought = model('Thought', ThoughtSchema)
const UserSchema = new Schema({
    username:{
        type: String,
        unique: true,
        required: 'Username is required.',
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/]
    },
    thoughts:[{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends:[{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }]
},
{
    toJSON:{
        virtuals: true,
        getters: true
    },
    id: false
})
const Users = model('Users', UserSchema)

ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length})
UserSchema.virtual('friendCount').get(function(){
    return this.friends.length})

module.exports = { Thought, Users}

// /api/users


// BONUS: Remove a user's associated thoughts when deleted.

// /api/users/:userId/friends/:friendId

// POST to add a new friend to a user's friend list

// DELETE to remove a friend from a user's friend list

// /api/thoughts

// GET to get all thoughts

// GET to get a single thought by its _id


// // example data
// {
//   "thoughtText": "Here's a cool thought...",
//   "username": "lernantino",
//   "userId": "5edff358a0fcb779aa7b118b"
// }

// DELETE to remove a thought by its _id

// /api/thoughts/:thoughtId/reactions

// POST to create a reaction stored in a single thought's reactions array field

// DELETE to pull and remove a reaction by the reaction's reactionId value