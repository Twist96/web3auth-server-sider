import express from "express";
import authRoutes from "./routes/auth";
import userRoute from "./routes/user";

const app = express();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use("*", (req, res) => {
  console.log(`404: ${req.method} ${req.path} not found`);
  res.status(404).json({ message: `Route ${req.path} not found` });
});

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/user", userRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
