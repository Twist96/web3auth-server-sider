import express from "express";
import { AuthService } from "../services/authService";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { token, pubkey } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    // console.log({ token, pubkey });
    const isValid = await AuthService.verifyToken(token, pubkey);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid JWT token" });
    }
    const payload = AuthService.decodeToken(token);

    // // Verify Google token
    // const googleUserInfo = await AuthService.verifyGoogleToken(token);

    if (!payload.email || !payload.name) {
      return res.status(400).json({ message: "Invalid user information" });
    }

    // Find existing user or create new one
    let user = AuthService.findUserByEmail(payload.email);

    if (!user) {
      user = AuthService.createUser(payload.email, payload.name);
    }

    // Generate JWT token
    const authToken = AuthService.generateToken(user);

    res.json({
      token: authToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(401).json({ message: "Authentication failed" });
  }
});

export default router;
