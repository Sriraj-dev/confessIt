const mongoose = require('mongoose')

confessionSchema = mongoose.Schema({
    title: String,
    description:String,
    likes:Number,
    comments: [
        {
            userid:String,
            comment:String
        }
    ]
})

module.exports = mongoose.model("Confession",confessionSchema);
