const mongoose = require("mongoose");

const SchoolHouseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
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

SchoolHouseSchema.index({ title: "text" });

module.exports = mongoose.model("school_houses", SchoolHouseSchema);
