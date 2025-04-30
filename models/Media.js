import mongoose from "mongoose";
require("./Person");

const { Schema } = mongoose;
// Schema
const mediaSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
    },
    poster: {
      type: String,
      default: "/images/avatar-holder.jpg",
    },
    header: {
      type: String,
      default: "/images/avatar-holder.jpg",
    },
    createdAt: {
      type: String,
    },
    updateAt: {
      type: String,
    },
    published: {
      type: Boolean,
      default: true,
    },
    tags: [String],
    media_id: Number,
    slug: String,
    score: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: "Score",
        },
      ],
    },
    yearProduct: Number,
    premiereDate: String,
    status: String,
    production: String,
    link: String,
    runtime: String,
    schedule: String,
    watchLinkTitle: String,
    watchLinkLogo: String,
    watchLink: String,
    videoTizer: String,
    instagram: String,
    network: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Network",
      },
    ],
    genre: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Genre",
      },
    ],
    state: [
      {
        type: mongoose.Types.ObjectId,
        ref: "State",
      },
    ],
  },
  { timestamps: true }
);

// Schema
const genreSchema = new Schema(
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

// Schema
const networkSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    type: String,
    logo: String,
  },
  { timestamps: true }
);

// Schema
const stateSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    media_id: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Media",
      },
    ],
  },
  { timestamps: true }
);

// Schema
const seasonSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    media_id: {
      type: Number,
      required: true,
    },
    number: Number,
    premiereDate: String,
    endDate: String,
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Schema
const episodeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    media_id: {
      type: Number,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    summary_episode: String,
    episode_number: Number,
    season_number: Number,
    airdate: String,
    episode_rate: Number,
    cover: String,
  },
  { timestamps: true }
);

// Schema
const castSchema = new Schema(
  {
    media_id: {
      type: mongoose.Types.ObjectId,
      ref: "Media",
    },
    person_id: {
      type: mongoose.Types.ObjectId,
      ref: "Person",
    },
    person_cat: String,
    role_name: String,
    thumb: String,
    position: Number,
  },
  { timestamps: true }
);

// Schema
const photoSchema = new Schema(
  {
    media_id: String,
    episode_id: String,
    url: String,
  },
  { timestamps: true }
);

// Schema
const scoreSchema = new Schema(
  {
    media_id: String,
    user_id: String,
    score: Number,
  },
  { timestamps: true }
);

// Schema
const reviewSchema = new Schema(
  {
    media_id: {
      type: mongoose.Types.ObjectId,
      ref: "Media",
    },
    user_id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    isSpoil: {
      type: Boolean,
      default: false,
    },
    isAccept: {
      type: Boolean,
      default: false,
    },
    overall: {
      type: Number,
      default: 0,
    },
    story: {
      type: Number,
      default: 0,
    },
    acting: {
      type: Number,
      default: 0,
    },
    visual: {
      type: Number,
      default: 0,
    },
    music: {
      type: Number,
      default: 0,
    },
    director: {
      type: Number,
      default: 0,
    },
    date: {
      type: String,
    },
  },
  { timestamps: true }
);

// Schema
const seenSchema = new Schema(
  {
    episode_id: {
      type: mongoose.Types.ObjectId,
      ref: "Episode",
    },
    user_id: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      default: "",
    },
    rate: {
      type: Number,
      default: 0,
      required: true,
    },
    date: {
      type: String,
    },
    like: {
      type: Boolean,
      default: false,
    },
    dislike: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Media =
  mongoose.models?.Media || mongoose.model("Media", mediaSchema);
export const Genre =
  mongoose.models?.Genre || mongoose.model("Genre", genreSchema);
export const Network =
  mongoose.models?.Network || mongoose.model("Network", networkSchema);
export const Season =
  mongoose.models?.Season || mongoose.model("Season", seasonSchema);
export const Episode =
  mongoose.models?.Episode || mongoose.model("Episode", episodeSchema);
export const Cast = mongoose.models?.Cast || mongoose.model("Cast", castSchema);
export const Photo =
  mongoose.models?.Photo || mongoose.model("Photo", photoSchema);
export const Score =
  mongoose.models?.Score || mongoose.model("Score", scoreSchema);
export const Review =
  mongoose.models?.Review || mongoose.model("Review", reviewSchema);
export const Seen = mongoose.models?.Seen || mongoose.model("Seen", seenSchema);
export const State =
  mongoose.models?.State || mongoose.model("State", stateSchema);
