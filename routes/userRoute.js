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
      base64Image: signinUser.base64Image,
      password: signinUser.password,
      isAdmin: signinUser.isAdmin,
      userType: signinUser.userType,
      // profilePicture: signinUser.profilePicture,
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
    // profilePicture: req.body.profilePicture,
  });
  const newUser = await user.save();
  res.status(201).json({ message: "Utilizador criado com sucesso." });
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
      // profilePicture: newUser.profilePicture,
      isAdmin: newUser.isAdmin,
      token: getToken(newUser),
    });
  } else res.status(401).send({ msg: "Dados inválidos!" });
});

// router.put("/:id", isAuth, async (req, res) => {
//   const userId = req.params.id;
//   const user = await User.findById(userId);
//   if (user) {
//     user.name = req.body.name || user.name;
//     user.email = req.body.email || user.email;
//     user.password = req.body.password || user.password;
//     const updatedUser = await user.save();
//     res.send({
//       _id: updatedUser.id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       isAdmin: updatedUser.isAdmin,
//       token: getToken(updatedUser),
//     });
//   } else {
//     res.status(404).send({ message: "User Not Found" });
//   }
// });
router.put("/:id", async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    user.birthDate = req.body.birthDate || user.birthDate;
    user.numberOfChildren = req.body.numberOfChildren || user.numberOfChildren;
    user.maritalStatus = req.body.maritalStatus || user.maritalStatus;
    user.base64Image = req.body.base64Image || user.base64Image;
    const updatedUser = await user.save();
    res.send({
      name: updatedUser.name,
      email: updatedUser.email,
      phoneNumber: updatedUser.phoneNumber,
      birthDate: updatedUser.birthDate,
      numberOfChildren: updatedUser.numberOfChildren,
      maritalStatus: updatedUser.maritalStatus,
      base64Image: updatedUser.base64Image,
      isAdmin: updatedUser.isAdmin,
      token: getToken(updatedUser),
      _id: updatedUser.id,
    });
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
});

router.put("/changePassword:id", async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (user) {
    user.password = req.body.password || user.password;

    const updatedUser = await user.save();
    res.send({
      password: updatedUser.password,
      token: getToken(updatedUser),
    });
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
});

// router.get("/createadmin", async (req, res) => {
//   try {
//     const user = new User({
//       name: "antonio",
//       email: "nuno_fernandes18@hotmail.com",
//       password: "123456",
//       isAdmin: true,
//     });
//     const newUser = await user.save();
//     res.send(newUser);
//   } catch (error) {
//     res.send({ msg: error.message });
//   }
// });

export default router;
