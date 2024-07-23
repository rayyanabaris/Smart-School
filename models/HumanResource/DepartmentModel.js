const mongoose = require("mongoose");

const DepartmentSchema = mongoose.Schema(
  {
    department: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

DepartmentSchema.index({ title: "text" });

module.exports = mongoose.model("department", DepartmentSchema);
