import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: process.env.PORT || 5000,
  MONGODB_URL:
    process.env.MONGODB_URL ||
    "mongodb+srv://quintadocabril:B22ldqg53vefxBUJ@cluster0.zr2pdzi.mongodb.net/?retryWrites=true&w=majority",
  JWT_SECRET: process.env.JWT_SECRET || "somethingsecret",
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || "sb",
};
