import mongoose from "mongoose";
require("./Media");

const { Schema } = mongoose;
// Schema
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      min: 5,
      max: 50,
    },
    active: {
      type: Boolean,
      default: true,
    },
    roles: {
      type: Number,
      default:200,
      // User: 200, UserPro:220, Super Admin: 100, Admin: 110 Author: 111
    },
    softDelete: {
      type: Boolean,
      default: false,
    },
    lastLoginAt: {
      type: String,
      default: Date.now(),
    },
    createdAt: {
      type: String,
      default:Date.now(),
    },
    refreshToken: {
      type: String,
      default: null,
    },
    sAccessToken: {
      type: String,
      default: null,
    },
    mobile: Number,
    bio: String,
    reviews: {
      type: Array,
      default:[],
    },
    favs: {
      type: Array,
      default:[],
    },
    watch_list: {
      type: Array,
      default:[],
    },
    followers: {
      type: Array,
      default:[],
    },
    following: {
      type: Array,
      default:[],
    },
    avatar:{
      type: String,
      default:'/images/avatar-holder.jpg',
    },
    deletedAt: String,
    provider: String,
    lastLoginIp: String,
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  },
  { timestamps: true }
);



// Schema
const trackSchema = new Schema(
  {
    media_id: {
      type: mongoose.Types.ObjectId,
      ref: "Media",
    },
    user_id:{
      type: mongoose.Types.ObjectId,
      ref: "User",
    }, 
  },
  { timestamps: true }
);

// Schema
const watchlistSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    media_id: [{
      type: mongoose.Types.ObjectId,
      ref: "Media",
    }],
    user_id:{
      type: mongoose.Types.ObjectId,
      ref: "User",
    }, 
  },
  { timestamps: true }
);





export const Track= mongoose.models?.Track || mongoose.model("Track", trackSchema);
export const WatchList= mongoose.models?.WatchList || mongoose.model("WatchList", watchlistSchema);
export const User= mongoose.models?.User || mongoose.model("User", userSchema);