const mongoose = require("mongoose");

const HostelSchema = mongoose.Schema(
  {
    hostel_name: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    intake: {
      type: String,
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

HostelSchema.index({ title: "text" });

module.exports = mongoose.model("hostel", HostelSchema);
