const mongoose = require("mongoose");

const DisableReasonSchema = mongoose.Schema(
  {
    disable_reason: {
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

DisableReasonSchema.index({ title: "text" });

module.exports = mongoose.model("disable_reason", DisableReasonSchema);
