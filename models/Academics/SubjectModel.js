const mongoose = require("mongoose");

const SubjectSchema = mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    subject_code: {
      type: String,
      required: true,
    },
    subject_type: {
      type: String,
      required: true,
    },
  },
  
  {
    timestamps: true,
  }
);

SubjectSchema.index({ title: "text" });

module.exports = mongoose.model("subjects", SubjectSchema);
