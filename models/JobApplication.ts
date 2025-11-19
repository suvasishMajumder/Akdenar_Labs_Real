import mongoose, { Schema, model, models } from "mongoose";

const JobApplicationSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    linkedin: { type: String },
    portfolio: { type: String },
    coverLetter: { type: String },
    resumeUrl: { type: String, required: true }, // uploaded PDF
    jobTitle: { type: String, required: true }, // Example: Product Manager
  },
  { timestamps: true }
);

export const JobApplication =
  models.JobApplication || model("JobApplication", JobApplicationSchema);
