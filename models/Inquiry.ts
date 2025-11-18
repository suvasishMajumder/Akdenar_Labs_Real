import mongoose, { Schema, models } from "mongoose";

const InquirySchema = new Schema(
  {
    formType: { type: String, required: true },
    // example: "basic-contact", "service-inquiry", "project-inquiry"

    name: String,
    fullName: String,
    firstName: String,
    lastName: String,

    email: String,
    phone: String,

    company: String,
    website: String,

    services: String,
    projectType: String,

    estimatedBudget: String,
    timeline: String,

    selectedPackage: String,
    priceRange: String,

    message: String,
    description: String,
    expectedOutcome: String,

    package: {
      name: String,
      price: String,
    },

    attachmentUrl: String, // optional file
  },
  { timestamps: true }
);

const Inquiry =
  mongoose.models.Inquiry || mongoose.model("Inquiry", InquirySchema);
export { Inquiry };
