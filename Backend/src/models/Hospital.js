import mongoose from "mongoose";

const HospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Hospital name is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    website: {
      type: String,
    },
    services: [String], // Example: ["Cardiology", "Pediatrics", "Surgery"]
  },
  { timestamps: true }
);

const Hospital = mongoose.model("Hospital", HospitalSchema);

export default Hospital;
