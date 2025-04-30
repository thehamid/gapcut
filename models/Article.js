import mongoose from "mongoose";
require("./User");

const { Schema } = mongoose;
// Schema
const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    excerpt: {
      type: String,
    },
    imgArticle: {
      type: String,
      default:'/images/avatar-holder.jpg',
    },
    createdAt: {
      type: String,
    },
    updateAt: {
      type: String,
    },
    published: {
      type: Boolean,
      default:true,
    },
    tags:[String],
    cats:{
      type: [mongoose.Types.ObjectId],
      ref: "ArticleCats",
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    source:String,
    slug:String,
  },
  { timestamps: true }
);


// Schema
const articleCatsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
  
  },
  { timestamps: true }
);

export const Article=  mongoose.models?.Article || mongoose.model("Article", articleSchema);
export const ArticleCats= mongoose.models?.ArticleCats || mongoose.model("ArticleCats", articleCatsSchema);