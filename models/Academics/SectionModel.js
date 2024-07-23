const mongoose = require("mongoose");

const SectionSchema = mongoose.Schema(
  {
    section: {
      type: String,
      required: true,
      unique: true,
    },
  },
  
  {
    timestamps: true,
  }
);

SectionSchema.index({ title: "text" });

module.exports = mongoose.model("sections", SectionSchema);
