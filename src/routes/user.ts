import express from "express";
import { AuthService } from "../services/authService";

const router = express.Router();

router.get("", (req, res) => {
  const users = AuthService.getUsers();
  console.log({ users });
  res.status(200).json(Array.from(users.values())); //[{ users: "God damn" }, { users: "God please" }]);
});

export default router;
