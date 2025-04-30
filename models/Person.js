import mongoose from "mongoose";

const { Schema } = mongoose;
// Schema
const personSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    imgPerson: {
      type: String,
      default:'/images/avatar-holder.jpg',
    },
    cats:{
        type: [mongoose.Types.ObjectId],
        ref: "PersonCats",
    },
    fans: {
      type: Array,
      default:[],
    },
    published: {
      type: Boolean,
      default: true,
    },
    birthday:String,
    slug: String,
    social: String,
  },
  { timestamps: true }
);


// Schema
const personCatsSchema = new Schema(
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

export const Person=  mongoose.models?.Person || mongoose.model("Person", personSchema);
export const PersonCats= mongoose.models?.PersonCats || mongoose.model("PersonCats", personCatsSchema);