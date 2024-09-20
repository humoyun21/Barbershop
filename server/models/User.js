const mongoose = require("mongoose");

const User = mongoose.Schema({
    phone: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    role: {
        type: String,
        enum: ["user", "manager" , "owner"],
        default: "user"
    },
    avatar: {
        type: String
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Users", User)