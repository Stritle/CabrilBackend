import mongoose from "mongoose";

const docsSchema = new mongoose.Schema(
  {
    nameDoc: { type: String },
    userId: { type: String },
  },
  {
    timestamps: true,
  }
);

const DocsModel = mongoose.model("Docs", docsSchema);

export default DocsModel;
