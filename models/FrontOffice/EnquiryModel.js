const mongoose = require("mongoose");

const EnquirySchema = mongoose.Schema(
  {

    name: {
      type: String,
      require: true,
    },

    phone: {
      type: String,
      require: true,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
    description: {
      type: String,
    },
    note: {
      type: String,
    },
    assigned: {
      type: String,
    },
    reference: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "reference",
      required: true,
    },
    source: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "source",
      required: true,
    },
    purpose: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "purpose",
      required: true,
    },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "class",
      required: true,
    },
    number_of_childs: {
      type: Number,
      require: true,
    },
  },

  {
    timestamps: true,
  }
);

EnquirySchema.index({ title: "text" });

module.exports = mongoose.model("enquiry", EnquirySchema);
