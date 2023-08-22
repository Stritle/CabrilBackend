import mongoose from "mongoose";

const docsSchema = new mongoose.Schema(
  {
    base64Doc: { type: String },
    nameDoc: { type: String },
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    userId: { type: String },
  },
  {
    timestamps: true,
  }
);

const DocsModel = mongoose.model("Docs", docsSchema);

export default DocsModel;
