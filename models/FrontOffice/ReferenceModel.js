const mongoose = require("mongoose");

const ReferenceSchema = mongoose.Schema(
  {
    reference: {
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

ReferenceSchema.index({ title: "text" });

module.exports = mongoose.model("reference", ReferenceSchema);
