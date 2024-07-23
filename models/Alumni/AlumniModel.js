const mongoose = require("mongoose");

const AlumniSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    event_for: {
      type: String,
      required: true,
    },
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sessions",
    },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "classes",
    },
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sections",
    },
    from_date: {
      type: Date,
      required: true,
    },
    to_date: {
      type: Date,
      required: true,
    },
    image: {
      type: String,
    },
    note: {
      type: String,
    },
    event_notification_message: {
      type: String,
    },
    is_active: {
      type: Number,
      required: true,
      default: "0",
    },
    url: {
      url: String,
      public_id: String,
    },
    created_at: {
      type: Date,
      default: Date.now(),
    },
    updated_at: {
      type: Date,
      default: Date.now(),
    },
  },

  {
    timestamps: true,
  }
);

AlumniSchema.index({ title: "text" });

module.exports = mongoose.model("Alumnis", AlumniSchema);
