const mongoose = require("mongoose");

const LeaveTypeSchema = mongoose.Schema(
  {
    leave_type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

LeaveTypeSchema.index({ title: "text" });

module.exports = mongoose.model("leave_types", LeaveTypeSchema);
