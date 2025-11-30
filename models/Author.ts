import mongoose, { Document, Model } from "mongoose";

interface IAuthorSchema extends Document {
  name: string;
  position?: string;
  avatar?: string;
  bio?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

const AuthorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    position: String,
    avatar: String,
    bio: String,
    socialLinks: {
      linkedin: String,
      twitter: String,
      github: String,
    },
  },
  { timestamps: true }
);

const Author: Model<IAuthorSchema> =
  mongoose.models.Author ||
  mongoose.model<IAuthorSchema>("Author", AuthorSchema);
export default Author;
