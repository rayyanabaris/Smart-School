const mongoose = require("mongoose");

const LanguageSchema = mongoose.Schema(
  {
    language: {
      type: String,
      required: true,
      unique: true,
    },
    short_code: {
      type: String,
      required: true,
    },
    country_code: {
      type: String,
      required: true,
    },
    is_rtl: {
      type: Number,
      required: true,
      default: 0,
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

LanguageSchema.index({ title: "text" });

module.exports = mongoose.model("languages", LanguageSchema);
