// models/Blog.js
import mongoose, { Model, Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  shortDescription?: string;
  content: string;
  bannerImage?: string;
  category: string;
  tags: string[];
  author: mongoose.Types.ObjectId;
  status: "Draft" | "Published" | "Scheduled";
  readingTime: number;
  views: number;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  publishedAt?: Date;
}

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [
        /^[a-z0-9-]+$/,
        "Slug can only contain letters, numbers and hyphens",
      ],
    },
    shortDescription: {
      type: String,
      maxlength: 160,
    },
    content: {
      type: String,
      required: true,
    },
    bannerImage: {
      url: String,
      alt: String,
      caption: String,
    },
    category: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },
    status: {
      type: String,
      enum: ["Draft", "Published", "Scheduled"],
      default: "Draft",
    },
    readingTime: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    metaTitle: {
      type: String,
      maxlength: 60,
    },
    metaDescription: {
      type: String,
      maxlength: 160,
    },
    ogImage: String,
    publishedAt: {
      type: Date,
      default: null,
    },
    scheduledPublish: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Auto-generate slug from title
BlogSchema.pre("save", function (next) {
  if (this.isModified("title") && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }
  next();
});

// Calculate reading time
BlogSchema.methods.calculateReadingTime = function (content: string) {
  const wordsPerMinute = 200;
  const wordCount = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

const Blog: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
export default Blog;
