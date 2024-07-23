const mongoose = require("mongoose");

const PhoneCallsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },

    phone: {
      type: String,
      require: true,
    },

    description: {
      type: String,
    },

    next_followup_date: {
      type: String,
    },

    call_duration: {
      type: String,
    },

    note: {
      type: String,
    },

    call_type: {
      type: String,
      require: true,
    },
  },

  {
    timestamps: true,
  }
);

PhoneCallsSchema.index({ title: "text" });

module.exports = mongoose.model("general_calls", PhoneCallsSchema);
