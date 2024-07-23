const mongoose = require("mongoose");

const HostelRoomSchema = mongoose.Schema(
  {
    room_number: {
      type: String,
      required: true,
      unique: true,
    },
    hostel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "hostel",
      required: true,
    },
    room_type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "room_type",
      required: true,
    },
    no_of_bed: {
      type: String,
      required: true,
    },
    cost_per_bed: {
      type: String,
      required: true,
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

HostelRoomSchema.index({ title: "text" });

module.exports = mongoose.model("hostel_rooms", HostelRoomSchema);
