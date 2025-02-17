import express from "express";
import { AuthService } from "../services/authService";

const router = express.Router();

router.get("", (req, res) => {
  const users = AuthService.getUsers();
  res.status(200).json(Array.from(users.values()));
});

export default router;
