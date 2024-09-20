const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.get("/", async (req, res) => {
    try{
        const allUsers = await User.find();
        res.json({
            message: "Got all users",
            payload: allUsers
        })
    }
    catch(error){
        res.status(500).json({
            message: error
        })
    }
})

module.exports = router