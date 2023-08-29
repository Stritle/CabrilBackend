import express from "express";
import Docs from "../models/docsModel.js";
import { getToken, isAuth } from "../util.js";
const router = express.Router();

router.post("/storeDocs", async (req, res) => {
  const doc = new Docs({
    base64Doc: req.body.base64Doc,
    nameDoc: req.body.nameDoc,
    user: req.user._id,
  });
  const newDoc = await doc.save();
  if (newDoc) {
    res.send({
      base64Doc: newDoc.base64Doc,
      nameDoc: newDoc.nameDoc,
      token: getToken(newDoc),
    });
  } else res.status(401).send({ msg: "Erro ao guardar Documentos" });
});

router.get("/loadDocs", async (req, res) => {
  try {
    const documents = await Docs.find();
    if (documents) {
      res.send(documents);
    }
  } catch (error) {
    console.error("Erro ao obter documentos do Utilizador:", error);
  }
});

export default router;
