const mongoose = require("mongoose");

const VisitorsBookSchema = mongoose.Schema(
  {
    purpose: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "purpose",
      required: true,
    },

    meeting_with: {
      type: String,
      require: true,
    },

    visitor_name: {
      type: String,
      require: true,
    },

    phone: {
      type: String,
    },

    id_card: {
      type: String,
    },

    no_of_person: {
      type: String,
    },

    in_time: {
      type: String,
      require: true,
    },

    out_time: {
      type: String,
      require: true,
    },

    note: {
      type: String
    },
    
  },

  {
    timestamps: true,
  }
);

VisitorsBookSchema.index({ title: "text" });

module.exports = mongoose.model("visitors_book", VisitorsBookSchema);
