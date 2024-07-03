import { WalletContextState } from "@jup-ag/wallet-adapter";
import crypto from "crypto";
import bs58 from "bs58";
import nacl from "tweetnacl";
import { PublicKey } from "@solana/web3.js";

export const getOrCreateAndSetStorageMessage = async (
  wallet: WalletContextState
) => {
  let verificationStr = localStorage.getItem("blinkhive_verification_string");
  let signatureStr = localStorage.getItem("blinkhive_signature_string");

  if (
    wallet.signMessage &&
    (!verificationStr ||
      !signatureStr ||
      (verificationStr && !isVertificationStrValid(verificationStr, wallet)))
  ) {
    const randomString = crypto.randomBytes(16).toString("hex");
    const verificationObj = {
      pubkey: wallet.publicKey?.toBase58(),
      timestamp: Math.floor(Date.now() / 1000),
      random: randomString,
    };
    verificationStr = JSON.stringify(verificationObj);
    signatureStr = bs58.encode(
      await wallet.signMessage(new TextEncoder().encode(verificationStr))
    );

    localStorage.setItem("blinkhive_verification_string", verificationStr);
    localStorage.setItem("blinkhive_signature_string", signatureStr);
  }

  return { verificationStr, signatureStr };
};

export const isVertificationStrValid = (
  verificationStr: string,
  wallet: WalletContextState
) => {
  try {
    const verificationObj = JSON.parse(verificationStr);
    const userPubKey = verificationObj?.pubkey ?? null;
    const timestamp = verificationObj?.timestamp ?? null;
    const random = verificationObj?.random ?? null;
    const timestampNow = Math.floor(Date.now() / 1000);
    const isExpired = timestampNow - timestamp > 86400; // 1 day
    const isSameKey =
      wallet.publicKey && wallet.publicKey.toBase58() === userPubKey;

    if (
      userPubKey === null ||
      timestamp === null ||
      random === null ||
      isExpired ||
      !isSameKey
    ) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error parsing verification string:", error);
    return false;
  }
};

export const verifyWalletSignature = (
  message: string,
  signature: string,
  publicKey: string
): boolean => {
  try {
    new PublicKey(publicKey);
    const verified = nacl.sign.detached.verify(
      new TextEncoder().encode(message),
      bs58.decode(signature),
      bs58.decode(publicKey)
    );
    return verified;
  } catch (_) {
    return false;
  }
};
