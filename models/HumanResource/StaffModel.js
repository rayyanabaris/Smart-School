const mongoose = require("mongoose");

const StaffSchema = mongoose.Schema(
  {
    staff_id: {
      type: String,
      required: true,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "roles"
    },
    designation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "staff_designation"
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "department"
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    fathers_name: {
      type: String,
    },
    mothers_name: {
      type: String,
    },
    email: {
      type: String,
    },
    gender: {
      type: String,
    },
    dob: {
      type: String,
    },
    dateof_joining: {
      type: String,
    },
    phone: {
      type: String,
    },
    emergency_contact: {
      type: String,
    },
    marital_status: {
      type: String,
    },
    image: {
      type: String,
    },
    address: {
      type: String,
    },
    permanent_address: {
      type: String,
    },
    qualification: {
      type: String,
    },
    work_experience: {
      type: String,
    },
    note: {
      type: String,
    },
    pan_number: {
      type: String,
    },
    url: {
      url : String,
      public_id : String,
    },
   created_at: {
        type: Date,
        default: Date.now()
    },
  },
);

StaffSchema.index({ title: "text" });

module.exports = mongoose.model("staff", StaffSchema);

