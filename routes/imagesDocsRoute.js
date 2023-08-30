import express from "express";
import Docs from "../models/docsModel.js";
import { getToken, isAuth } from "../util.js";
const router = express.Router();

router.post("/storeDocs", async (req, res) => {
  const doc = new Docs({
    nameDoc: req.body.nameDoc,
    userId: req.body.userId,
  });
  const newDoc = await doc.save();
  if (newDoc) {
    res.send({
      token: getToken(newDoc),
    });
  } else res.status(401).send({ msg: "Erro ao guardar Documentos" });
});

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  const documents = await Docs.find({ userId });
  if (documents) {
    res.send(documents);
  } else res.status(401).send({ msg: "Erro ao carregar Documentos" });
});

export default router;
