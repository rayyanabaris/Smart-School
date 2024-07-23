const mongoose = require("mongoose");

const RoleSchema = mongoose.Schema(
  {
    role: {
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

RoleSchema.index({ title: "text" });

module.exports = mongoose.model("roles", RoleSchema);
