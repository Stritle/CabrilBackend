import mongoose from "mongoose";

const imagesDocsSchema = new mongoose.Schema(
  {
    imagesDocs: { type: String },
  },
  {
    timestamps: true,
  }
);

const ImagesDocsModel = mongoose.model("ImagesDocs", imagesDocsSchema);

export default ImagesDocsModel;
