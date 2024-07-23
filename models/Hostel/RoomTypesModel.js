const mongoose = require("mongoose");

const RoomTypeSchema = mongoose.Schema(
  {
    room_type: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
  },
  
  {
    timestamps: true,
  }
);

RoomTypeSchema.index({ title: "text" });

module.exports = mongoose.model("room_type", RoomTypeSchema);
