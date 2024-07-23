const mongoose = require("mongoose");

const RouteSchema = mongoose.Schema(
  {
    route_title: {
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

RouteSchema.index({ title: "text" });

module.exports = mongoose.model("vehicle_routes", RouteSchema);
