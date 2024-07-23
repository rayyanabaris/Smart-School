const mongoose = require("mongoose");

const SubjectGroupSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    class_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "classes",
      required: true,
    },
    section_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "sections",
        required: true,
      },
    ],
    subject_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subjects",
        required: true,
      },
    ],
    description: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

SubjectGroupSchema.index({ title: "text" });

module.exports = mongoose.model("subject_groups", SubjectGroupSchema);
