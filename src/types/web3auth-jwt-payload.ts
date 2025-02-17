export interface Web3AuthJWTPayload {
  iat: number;
  aud: string;
  nonce: string;
  iss: string;
  wallets: Wallet[];
  email: string;
  name: string;
  profileImage: string;
  verifier: string;
  verifierId: string;
  aggregateVerifier: string;
  exp: number;
}

export interface Wallet {
  public_key: string;
  type: string;
  curve: string;
}
