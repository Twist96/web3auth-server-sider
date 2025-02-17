import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const GOOGLE_CLIENT_ID =
  process.env.GOOGLE_CLIENT_ID || "your-google-client-id";

export { JWT_SECRET, GOOGLE_CLIENT_ID };
