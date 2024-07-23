const mongoose = require("mongoose");

const SourceSchema = mongoose.Schema(
  {
    source: {
      type: String,
      require: true,
    },
    
    description: {
      type: String,
    },  },
  {
    timestamps: true,
  }
);

SourceSchema.index({ title: "text" });

module.exports = mongoose.model("source", SourceSchema);
