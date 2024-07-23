const mongoose = require("mongoose");

const PickupPointSchema = mongoose.Schema(
  {
    pickup_point: {
      type: String,
      required: true,
      unique: true,
    },
    latitude: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
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

PickupPointSchema.index({ title: "text" });

module.exports = mongoose.model("pickup_point", PickupPointSchema);
