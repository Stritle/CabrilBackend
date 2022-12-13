import express from "express";
import Vinho from "../models/vinhoModel.js";
// import data from "../data.js";
// import { isAuth, isAdmin } from "../util";

const router = express.Router();

router.get("/", async (req, res) => {
  const vinhos = await Vinho.find();
  res.send(vinhos);
});

// router.get("/seed", async (req, res) => { addicionar vinhos atraves do ficheiro data.js
//   const createdVinhos = await Vinho.insertMany(data.vinhos);
//   res.send({ createdVinhos });
// });

router.get("/:id", async (req, res) => {
  const vinho = await Vinho.findOne({ _id: req.params.id });
  if (vinho) {
    res.send(vinho);
  } else {
    res.status(404).send({ message: "Product Not Found." });
  }
});

export default router;
