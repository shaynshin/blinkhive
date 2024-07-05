"use client";

import { useRouter } from "next/navigation";
import { UnifiedWalletButton, useWallet } from "@jup-ag/wallet-adapter";
import { useEffect, useState } from "react";
import {
  getAndValidateStorageMessage,
  getOrCreateAndSetStorageMessage,
} from "@/lib/walletAuth";

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const wallet = useWallet();

  useEffect(() => {
    setIsLoading(true);
    const checkVerified = async () => {
      try {
        if (wallet && wallet.publicKey && !wallet.disconnecting) {
          const { verificationStr, signatureStr } =
            await getOrCreateAndSetStorageMessage(wallet);

          if (!verificationStr || !signatureStr) {
            throw Error("No stored verifications");
          }

          router.push("/dashboard/affiliate");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkVerified();
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
              <div className="mx-auto loading loading-spinner loading-md" />
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
