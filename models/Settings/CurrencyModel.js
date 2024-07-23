const mongoose = require("mongoose");

const CurrencySchema = mongoose.Schema(
  {
    currency: {
      type: String,
      required: true,
      unique: true,
    },
    short_code: {
      type: String,
      required: true,
    },
    currency_symbol: {
      type: String,
      required: true,
    },
    conversion_rate: {
      type: String,
      required: true,
    },
    base_currency: {
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

CurrencySchema.index({ title: "text" });

module.exports = mongoose.model("currencies", CurrencySchema);
