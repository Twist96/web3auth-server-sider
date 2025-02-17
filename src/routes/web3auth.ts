import * as jose from "jose";

function verifyPublicKey(
  public_key: string,
  jwtDecoded: jose.JWTVerifyResult<jose.JWTPayload> &
    jose.ResolvedKey<jose.KeyLike>
) {
  if (
    (jwtDecoded.payload as any).wallets
      .find((x: { type: string }) => x.type === "solana")
      .address.toLowerCase() === public_key.toLowerCase()
  ) {
    true;
  } else {
    false;
  }
}
