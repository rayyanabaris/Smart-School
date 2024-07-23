const mongoose = require("mongoose");

const ClassSchema = mongoose.Schema(
  {
    class: {
      type: String,
      required: true,
      unique: true,
    },

    section_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "sections",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

ClassSchema.index({ title: "text" });

module.exports = mongoose.model("classes", ClassSchema);
