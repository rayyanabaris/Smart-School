const mongoose = require("mongoose");

const RoutePickupPointSchema = mongoose.Schema(
  {
    route_list: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vehicle_routes",
      required: true,
    },
    pickup_point: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "pickup_point",
        required: true,
      },
    ],

    distance: [
      {
        type: String,
        required: true,
      },
    ],
    pickup_time: [
      {
        type: String,
        required: true,
      },
    ],
    monthly_fees: [
      {
        type: String,
        required: true,
      },
    ],
    is_active: {
      type: Number,
      required: true,
      default: "0",
    },
  },

  {
    timestamps: true,
  }
);

RoutePickupPointSchema.index({ title: "text" });

module.exports = mongoose.model("route_pickup_point", RoutePickupPointSchema);
