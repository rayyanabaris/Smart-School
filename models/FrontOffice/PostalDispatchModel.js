const mongoose = require("mongoose");

const PostalDispatchSchema = mongoose.Schema(
  {
    to_title: {
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
    
    from_title: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

PostalDispatchSchema.index({ title: "text" });

module.exports = mongoose.model("postal_dispatch", PostalDispatchSchema);
