const mongoose = require("mongoose");

const DesignationSchema = mongoose.Schema(
  {
    designation: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

DesignationSchema.index({ title: "text" });

module.exports = mongoose.model("staff_designation", DesignationSchema);
