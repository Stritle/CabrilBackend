import express from "express";
import Docs from "../models/docsModel.js";
import { getToken, isAuth } from "../util.js";
const router = express.Router();

router.post("/storeDocs", async (req, res) => {
  const doc = new Docs({
    base64Doc: req.body.base64Doc,
    nameDoc: req.body.nameDoc,
  });
  const newDoc = await doc.save();
  res.status(201).json({ message: "Utilizador criado com sucesso." });
  if (newDoc) {
    res.send({
      base64Doc: newDoc.base64Doc,
      nameDoc: newDoc.nameDoc,
      token: getToken(newDoc),
      _id: newDoc.id,
    });
  } else res.status(401).send({ msg: "Dados inválidos!" });
});
//..................................
router.get("/loadDocs", async (req, res) => {
  const docs = await ImagesDocs.find();
  const newDocs = await docs.save();
  res.status(201).json({ message: "Documentos carregados com sucesso" });
  if (newDocs) {
    res.send({
      imagesDocs: newDocs.imagesDocs,
      nameDoc: newDocs.nameDoc,
      token: getToken(newDocs),
    });
  } else res.status(401).send({ msg: "Erro ao carregar Documentos" });
});

export default router;
