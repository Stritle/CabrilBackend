import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";
import bodyParser from "body-parser";
import vinhoRoute from "./routes/vinhoRoute.js";
import orderRoute from "./routes/orderRoute.js";
import cors from "cors";
import dotenv from "dotenv";
import config from "./config.js";

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
