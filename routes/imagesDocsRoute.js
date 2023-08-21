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
      _id: newDoc.id,
      base64Doc: newDoc.base64Doc,
      nameDoc: newDoc.nameDoc,
      token: getToken(newDoc),
    });
  } else res.status(401).send({ msg: "Erro ao guardar Documentos" });
});

// router.get("/user/:userId/documents", async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const documents = await Document.find({ userId });
//     res.json(documents);
//   } catch (error) {
//     console.error("Erro ao obter documentos do Utilizador:", error);
//     res.status(500).json({ error: "Erro ao obter documentos do Utilizador." });
//   }
// });

//   const newDocs = await docs.save();

//   if (newDocs) {
//     res.send({
//       imagesDocs: newDocs.imagesDocs,
//       nameDoc: newDocs.nameDoc,
//       token: getToken(newDocs),
//     });
//   } else res.status(401).send({ msg: "Erro ao carregar Documentos" });

export default router;
