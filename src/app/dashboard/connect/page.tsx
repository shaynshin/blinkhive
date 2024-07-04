"use client";

import { useRouter } from "next/navigation";
import { UnifiedWalletButton, useWallet } from "@jup-ag/wallet-adapter";
import { useEffect, useState } from "react";
import { getAndValidateStorageMessage } from "@/lib/walletAuth";

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const wallet = useWallet();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!wallet || !wallet.publicKey) {
          return;
        }

        const { verificationStr, signatureStr } =
          getAndValidateStorageMessage(wallet);

        if (!verificationStr || !signatureStr) {
          throw Error("No stored verifications");
        }

        const response = await fetch("/api/whitelist/affiliate", {
          headers: {
            "Content-Type": "application/json",
            "X-Verification": verificationStr,
            "X-Signature": signatureStr,
            "X-Pubkey": wallet.publicKey.toBase58(),
          },
        });

        if (!response.ok) router.push("/dashboard/waitlist");
        else router.push("/dashboard/affiliate");

        setIsLoading(false);
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };

    checkAuth();
  }, [wallet]);

  return (
    <div className="absolute inset-0 flex items-center justify-center p-6">
      <div className="card w-96 bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center mb-4">
            Connect wallet to continue
          </h2>
          <div className="form-control">
            {isLoading ? (
              <div className="loading loading-spinner loading-md" />
            ) : (
              <UnifiedWalletButton
                buttonClassName="btn btn-primary"
                currentUserClassName="btn btn-primary"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
