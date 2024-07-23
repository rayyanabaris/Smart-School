const mongoose = require("mongoose");

const PurposeSchema = mongoose.Schema(
  {
    purpose: {
      type: String,
      require: true,
    },
    
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

PurposeSchema.index({ title: "text" });

module.exports = mongoose.model("purpose", PurposeSchema);
