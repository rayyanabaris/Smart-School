const mongoose = require("mongoose");

const ComplainttypeSchema = mongoose.Schema(
  {
    complaint_type: {
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

ComplainttypeSchema.index({ title: "text" });

module.exports = mongoose.model("complaint_type", ComplainttypeSchema);
