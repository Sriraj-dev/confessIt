
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {type: String},
    password: {type: String},
    email: {type: String},
    likedConfessions : [String]
});

module.exports = mongoose.model("UserModel", userSchema);
