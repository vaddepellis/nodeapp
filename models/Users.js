const mongoose = require("mongoose");
const usersSchema = new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    created:String
})
module.exports = mongoose.model("node_users",usersSchema);