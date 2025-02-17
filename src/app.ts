import express from "express";
import authRoutes from "./routes/auth";
import userRoute from "./routes/user";

const app = express();

app.use(express.json());
app.use("/auth", authRoutes).use("/user", userRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
