import express from "express";
import {
  bookAppointment,
  getAppointments,
  cancelAppointment,
} from "../controllers/appointmentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, bookAppointment);
router.get("/", protect, getAppointments);
router.delete("/:id", protect, cancelAppointment);

export default router;
