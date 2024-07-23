const mongoose = require("mongoose");

const AssignVehicleSchema = mongoose.Schema(
  {
    vehical_number: {
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

AssignVehicleSchema.index({ title: "text" });

module.exports = mongoose.model("transport_route", AssignVehicleSchema);
