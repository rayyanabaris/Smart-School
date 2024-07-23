const mongoose = require("mongoose");

const PostalReciveSchema = mongoose.Schema(
  {
    from_title: {
      type: String,
      require: true,
    },

    reference_no: {
      type: String,
    },

    address: {
      type: String,
    },

    note: {
      type: String,
    },
    
    to_title: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

PostalReciveSchema.index({ title: "text" });

module.exports = mongoose.model("postal_recive", PostalReciveSchema);
