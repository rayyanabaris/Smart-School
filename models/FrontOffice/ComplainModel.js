const mongoose = require("mongoose");

const ComplainSchema = mongoose.Schema(
  {
    complain_type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "complaint_type",
      required: true,
    },

    complain_by: {
      type: String,
      require: true,
    }, 
    
    Phone: {
      type: String,
    }, 

    date: {
      type: Date,
    },
    
    description: {
      type: String,
    },  

    action_taken: {
      type: String,
    },  

    assigned: {
      type: String,
    },  

    note: {
      type: String,
    },  
  },
  
  {
    timestamps: true,
  }
);

ComplainSchema.index({ title: "text" });

module.exports = mongoose.model("complaint", ComplainSchema);
