import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import { JWT_SECRET, GOOGLE_CLIENT_ID } from "../config/auth";
import { User } from "../types/user";
import crypto from "crypto";
import * as jose from "jose";
import { jwtDecode } from "jwt-decode";
import sign from "jwt-encode";

import { Web3AuthJWTPayload } from "../types/web3auth-jwt-payload";

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

// In-memory storage for users
const users: Set<User> = new Set();

export class AuthService {
  static async verifyGoogleToken(token: string) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      if (!payload) throw new Error("Invalid token payload");
      return payload;
    } catch (error) {
      throw new Error("Invalid Google token");
    }
  }

  static generatePassword() {
    return crypto.randomBytes(16).toString("hex");
  }

  static findUserByEmail(email: string): User | undefined {
    return Array.from(users).find((user) => user.email === email);
  }

  static createUser(email: string, name: string): User {
    const id = crypto.randomUUID();
    const password = this.generatePassword();
    const user: User = { id, email, name, password };
    users.add(user);
    return user;
  }

  static generateAuthToken(user: User): string {
    return jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "24h",
    });
  }

  static async verifyToken(idToken: string, app_pub_key: string) {
    const jwks = jose.createRemoteJWKSet(
      new URL("https://api-auth.web3auth.io/jwks")
    );
    const jwtDecoded = await jose.jwtVerify(idToken, jwks, {
      algorithms: ["ES256"],
    });

    let pubkey = (jwtDecoded.payload as any).wallets
      .find((x: { type: string }) => x.type === "web3auth_app_key")
      .public_key.toLowerCase();

    console.log({ pubkey });
    console.log({ app_pub_key });

    if (
      (jwtDecoded.payload as any).wallets
        .find((x: { type: string }) => x.type === "web3auth_app_key")
        .public_key.toLowerCase() === app_pub_key.toLowerCase()
    ) {
      return true;
    } else {
      return false;
    }
  }

  static decodeToken(token: string) {
    return jwtDecode<Web3AuthJWTPayload>(token);
  }

  static generateToken(user: any) {
    return sign(user, "some-random-string");
  }
}
