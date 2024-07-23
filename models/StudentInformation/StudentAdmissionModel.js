const mongoose = require("mongoose");

const StudentAdmissionSchema = mongoose.Schema({
  admission_no: {
    type: String,
    required: true,
  },
  roll_no: {
    type: String,
    required: true,
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "classes",
    required: true,
  },
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "sections",
    required: true,
  },
  house: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "school_houses",
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
  },
  gender: {
    type: String,
  },
  dob: {
    type: String,
  },
  religion: {
    type: String,
  },
  caste: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  image: {
    type: String,
  },
  admission_date: {
    type: Date,
    default: Date.now(),
  },
  bloog_group: {
    type: String,
  },
  height: {
    type: String,
  },
  weight: {
    type: String,
  },
  measurement_date: {
    type: String,
  },
  medical_history: {
    type: String,
  },
  url: {
    url: String,
    public_id: String,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

StudentAdmissionSchema.index({ title: "text" });

module.exports = mongoose.model("students", StudentAdmissionSchema);
