const mongoose = require("mongoose");

const SessionSchema = mongoose.Schema(
  {
    session: {
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

SessionSchema.index({ title: "text" });

module.exports = mongoose.model("sessions", SessionSchema);
