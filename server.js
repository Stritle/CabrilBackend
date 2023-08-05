import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";
import bodyParser from "body-parser";
import vinhoRoute from "./routes/vinhoRoute.js";
import orderRoute from "./routes/orderRoute.js";
import cors from "cors";
import dotenv from "dotenv";
import config from "./config.js";
import multer from "multer";

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((error) => console.log(error.reason));

if (mongodbUrl) {
  console.log("connected");
}

const app = express();
app.use(bodyParser.json({ limit: "20mb" }));
//____________________________________________

const ImageSchema = new mongoose.Schema({
  data: String,
});

const Image = mongoose.model("Image", ImageSchema);

app.post("/api/upload-image", async (req, res) => {
  try {
    const { image } = req.body;

    const newImage = new Image({ data: image });
    await newImage.save();

    res.status(201).json({ message: "Imagem salva com sucesso." });
  } catch (error) {
    res.status(500).json({ error: "Erro ao salvar a imagem." });
  }
});
//___________________________________________
app.use(
  cors({
    origin: ["https://quintadocabril.netlify.app/"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    origin: true,
  })
);

app.use("/api/users", userRoute);
app.use("/api/vinhos", vinhoRoute);
app.use("/api/orders", orderRoute);
app.get("/api/config/paypal", (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID || "SB");
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(config.PORT, () => {
  console.log(`Server at http://localhost:${config.PORT}`);
});
