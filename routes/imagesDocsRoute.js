import express from "express";
import ImagesDocs from "../models/imagesDocsModel.js";
import { getToken, isAuth } from "../util.js";
const router = express.Router();

router.post("/storeImages", async (req, res) => {
  const imageDocs = new ImagesDocs({
    imagesDocs: req.body.imagesDocs,
  });
  const newImagesDocs = await imageDocs.save();
  res.status(201).json({ message: "Utilizador criado com sucesso." });
  if (newImagesDocs) {
    res.send({
      _id: newImagesDocs.id,
      imagesDocs: newImagesDocs.imagesDocs,

      token: getToken(newImagesDocs),
    });
  } else res.status(401).send({ msg: "Dados inválidos!" });
});

export default router;
