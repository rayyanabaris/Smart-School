const mongoose = require("mongoose");

const ApplyLeaveSchema = mongoose.Schema(
  {
    staff_name: {
      type: String,
      required: true,
    },
    leave_type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "leave_types",
      required: true,
    },
    leavefrom_date: {
      type: String,
      required: true,
    },
    leaveto_date: {
      type: String,
      required: true,
    },
    days: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
    },
    note: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      default: 'P',
    },
  },
  {
    timestamps: true,
  }
);

ApplyLeaveSchema.index({ title: "text" });

module.exports = mongoose.model("staff_leave_request", ApplyLeaveSchema);
