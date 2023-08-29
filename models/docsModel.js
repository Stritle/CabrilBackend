import mongoose from "mongoose";

const docsSchema = new mongoose.Schema(
  {
    base64Doc: { type: String },
    nameDoc: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

const DocsModel = mongoose.model("Docs", docsSchema);

export default DocsModel;
