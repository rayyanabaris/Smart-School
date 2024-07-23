const mongoose = require("mongoose");

const StudentCategorySchema = mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      unique: true,
    },
    is_active: {
      type: Number,
      required: true,
      default: '0',
    },
  },
  {
    timestamps: true,
  }
);

StudentCategorySchema.index({ title: "text" });

module.exports = mongoose.model("categories", StudentCategorySchema);
