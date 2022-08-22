import User, { IUser } from "../models/User";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

import express, { Router } from "express";

const router: Router = express.Router();

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC as string
      // process.env.PASS_SEC || ""
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json("Wrong credentials!");

    if (user !== null) {
      !bcryptjs.compareSync(req.body.password, user.password) &&
        res.status(401).json("Wrong credentials!");

      const accessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC || "",
        { expiresIn: "3d" }
      );
      console.log(user);

      const { password, ...others } = user._doc;

      res.status(200).json({ ...others, accessToken });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export default router;
