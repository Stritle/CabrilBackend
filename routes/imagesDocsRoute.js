import express from "express";
import Docs from "../models/docsModel.js";
import { getToken, isAuth } from "../util.js";
const router = express.Router();

router.post("/storeDocs", async (req, res) => {
  const doc = new Docs({
    base64Doc: req.body.base64Doc,
    nameDoc: req.body.nameDoc,
    userId: req.body.userId,
  });
  const newDoc = await doc.save();
  if (newDoc) {
    res.send({
      nameDoc: newDoc.nameDoc,
      token: getToken(newDoc),
    });
  } else {
    res.status(401).send({ msg: "Erro ao guardar Documentos" });
  }
});
//buscar todos os dosc do utilizador
router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  const documents = await Docs.find({ userId });
  if (documents) {
    res.send(documents);
  } else res.status(401).send({ msg: "Erro ao carregar Documentos" });
});
router.post("/loadfile", async (req, res) => {
  const documents = await Docs.find({
    nameDoc: req.body.nameDoc,
    userId: req.body.userId,
  });
  if (documents) {
    res.send({ base64Doc: documents.base64Doc });
  } else res.status(401).send({ msg: "Erro ao carregar Documentos" });
});

export default router;
