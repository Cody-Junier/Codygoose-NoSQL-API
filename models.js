const {Schema, model, Types} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

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
    }
})

const ThoughtSchema = new Schema({
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
    }
}
)

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
    thoughts:[ThoughtSchema],
    friends:[UserSchema]
},
{
    toJSON:{
        virtuals: true,
        getters: true
    }
})

ThoughtSchema.virtual('reactionCount').get(this.reactions.length + 1)
UserSchema.virtual('friendCount').get(this.friends.length +1)