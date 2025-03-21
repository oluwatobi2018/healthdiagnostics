import express from "express";
import {
  getHospitals,
  getHospitalById,
  createHospital,
  updateHospital,
  deleteHospital,
} from "../controllers/hospitalController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getHospitals);
router.get("/:id", getHospitalById);
router.post("/", protect, admin, createHospital);
router.put("/:id", protect, admin, updateHospital);
router.delete("/:id", protect, admin, deleteHospital);

export default router;
