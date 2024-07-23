const mongoose = require("mongoose");

const VehicleSchema = mongoose.Schema(
  {
    vehicle_no: {
      type: String,
      required: true,
      unique: true,
    },
    vehicle_model: {
      type: String,
      required: true,
    },
    year_made: {
      type: String,
    },
    registration_number: {
      type: String,
    },
    chasis_number: {
      type: String,
    },
    max_seating_capacity: {
      type: String,
    },
    driver_name: {
      type: String,
    },
    driver_licence: {
      type: String,
    },
    driver_contact: {
      type: String,
    },
    note: {
      type: String,
    },
    image: {
      type: String,
    },
    url: {
      url: String,
      public_id: String,
    },
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

VehicleSchema.index({ title: "text" });

module.exports = mongoose.model("vehicles", VehicleSchema);
