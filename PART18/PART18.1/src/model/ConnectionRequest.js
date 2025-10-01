const mongoose = require('mongoose')

const ConnectionRequestSchema = mongoose.Schema({
    formUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    toUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    status : {
        type : String,
        required : true,
        enum : {
            values : ["ignored" , "interested", "accepted", "rejected"],
            message : `{VALUE} is incorrect status type`
        }
    },    
},
{
    timestamps  : true
})

const ConnectionRequest =  mongoose.model("ConnectionRequest", ConnectionRequestSchema)

module.exports = ConnectionRequest