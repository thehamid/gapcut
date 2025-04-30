import mongoose from "mongoose";

const { Schema } = mongoose;
// Schema
const fileSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.File || mongoose.model("File", fileSchema);
