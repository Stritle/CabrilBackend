import express from "express";
import config from "./config.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";
import bodyParser from "body-parser";
import vinhoRoute from "./routes/vinhoRoute.js";
import orderRoute from "./routes/orderRoute.js";
import path from "path";

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
app.use(bodyParser.json());

app.use("/api/users", userRoute);
app.use("/api/vinhos", vinhoRoute);
app.use("/api/orders", orderRoute);
app.get("/api/config/paypal", (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID || "SB");
});

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build/index.html"));
});

// app.get("/api/vinhos/:id", (req, res) => {
//   const vinhoId = req.params.id;
//   const vinho = data.vinhos.find((x) => x._id === vinhoId);
//   if (vinho) {
//     res.send(vinho);
//   } else {
//     res.status(404).send({ msg: "Vinho não encontrado!" });
//   }
// });

// app.get("/api/vinhos", (req, res) => {
//   res.send(data.vinhos);
// });
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(config.PORT, () => {
  console.log(`Server at http://localhost:${config.PORT}`);
});
