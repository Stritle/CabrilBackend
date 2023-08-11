import express from "express";
import Docs from "../models/docsModel.js";
import { getToken, isAuth } from "../util.js";
const router = express.Router();

router.post("/storeDocs", async (req, res) => {
  const doc = new Docs({
    base64Doc: req.body.imagesDocs,
    nameDoc: req.body.docsName,
  });
  const newDoc = await doc.save();
  // res.status(201).json({ message: "Documentos guardado com sucesso." });
  if (newDoc) {
    res.send({
      _id: newDoc.id,
      base64Doc: newDoc.imagesDocs,
      nameDoc: newDoc.docsName,
      token: getToken(newDoc),
    });
  } else res.status(401).send({ msg: "Erro ao guardar Documentos" });
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
