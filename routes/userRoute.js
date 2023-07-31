import express from "express";
import User from "../models/userModel.js";
import { getToken, isAuth } from "../util.js";

const router = express.Router();

router.post("/signin", async (req, res) => {
  const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (signinUser) {
    res.send({
      _id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      phoneNumber: signinUser.phoneNumber,
      birthDate: signinUser.birthDate,
      numberOfChildren: signinUser.numberOfChildren,
      maritalStatus: signinUser.maritalStatus,
      isAdmin: signinUser.isAdmin,
      userType: signinUser.userType,
      userImage: signinUser.userImage,
      token: getToken(signinUser),
    });
  } else res.status(401).send({ msg: "Invalide email or password" });
});

router.post("/register", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
    birthDate: req.body.birthDate,
    numberOfChildren: req.body.numberOfChildren,
    maritalStatus: req.body.maritalStatus,
    userImage: req.body.userImage,
  });
  const newUser = await user.save();
  if (newUser) {
    res.send({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      phoneNumber: newUser.phoneNumber,
      birthDate: newUser.birthDate,
      numberOfChildren: newUser.numberOfChildren,
      maritalStatus: newUser.maritalStatus,
      userImage: newUser.userImage,
      isAdmin: newUser.isAdmin,
      token: getToken(newUser),
    });
  } else res.status(401).send({ msg: "Dados inválidos!" });
});

router.put("/:id", isAuth, async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: getToken(updatedUser),
    });
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
});

router.get("/createadmin", async (req, res) => {
  try {
    const user = new User({
      name: "antonio",
      email: "nuno_fernandes18@hotmail.com",
      password: "123456",
      isAdmin: true,
    });
    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

export default router;
