const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const router = express.Router();

router.post("/sign-up", async (req, res) => {
  const saltRounds = 10;
  const { first_name, last_name, phone, age, avatar, password } = req.body;

  const schema = Joi.object({
    phone: Joi.string().min(13).max(13).required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    password: Joi.string().min(5).required(),
  });

  try {
    const validation = schema.validate({
      first_name,
      last_name,
      phone,
      password,
    });

    if (validation.error)
      return res.status(400).json({
        message:
          validation.error.details[0].message
            .replace(/['"_]+/g, "")
            .capitalize() + "!",
      });

    let user = await User.findOne({ phone });

    if (user)
      return res.status(400).json({
        message: "User alredy exist!",
      });

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    user = await User.create({
      first_name,
      last_name,
      phone,
      age,
      avatar,
      password: hash,
    });

    if (user) {
      res.status(201).json({
        message: "New user created!",
        payload: user,
      });
    }

    res.json({
      message: "User couldn't be created",
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

router.post("/sign-in", async (req, res) => {
  const { phone, password } = req.body;

  const schema = Joi.object({
    phone: Joi.string().min(13).max(13).required(),
    password: Joi.string().min(5).required(),
  });

  try {
    const validation = schema.validate({ phone, password });

    if (validation.error)
      return res.status(400).json({
        message:
          validation.error.details[0].message
            .replace(/['"_]+/g, "")
            .capitalize() + "!",
      });

    const JWT_SECRET = process.env.JWT_SECRET;
    const user = await User.findOne({ phone });

    if (!user) return res.json({ message: "User not found!" });

    let result = bcrypt.compareSync(password, user.password);

    if (!result)
      return res.status(401).json({
        message: "Phone number or password is incorrect",
      });

    let token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1m",
    });

    res.json({
      message: "User found",
      payload: { user, token },
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

router
  .get("/profile", async (req, res) => {
    // const {id} = req.user;
    try {
      const user = await User.findById("66ed04d3bbe686630a2e0518");
      res.json({
        message: "Got profile data",
        payload: user,
      });
    } 
    catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  })
  .patch("/profile", async (req, res) => {
    // const {id} = req.user;
    try {
      const user = await User.findByIdAndUpdate("66ed04d3bbe686630a2e0518", req.body, {new: true});
      if(user){
        res.status(200).json({
          message: "Successfully updated profile data!",
          payload: user,
        });
      }
      res.status(500).json({
        message: "Something went wrong!"
      });
    } 
    catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  })

module.exports = router;
