"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@jup-ag/wallet-adapter";
import { getOrCreateAndSetStorageMessage } from "@/lib/walletAuth";

const LoadingAnimation = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
    <span className="loading loading-bars loading-lg text-info" />
  </div>
);

const withWalletAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const AuthComponent = (props: any) => {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const wallet = useWallet();

    useEffect(() => {
      const checkVerifiedAndWhitelist = async () => {
        try {
          if (!wallet || !wallet.publicKey) {
            throw Error("Wallet not available");
          }

          const { verificationStr, signatureStr } =
            await getOrCreateAndSetStorageMessage(wallet);

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

          if (!response.ok)
            router.push(
              `/dashboard/waitlist?role=affiliate&wallet=${wallet.publicKey.toBase58()}`
            );
        } catch (error) {
          console.error("Error checking authentication:", error);
          router.push("/dashboard/connect");
        } finally {
          setIsLoading(false);
        }
      };

      checkVerifiedAndWhitelist();
    }, [wallet]);

    if (isLoading === false) {
      return <WrappedComponent {...props} />;
    }

    return <LoadingAnimation />;
  };

  // Set display name for the HOC for better debugging messages
  AuthComponent.displayName = `withWalletAuth(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;

  return AuthComponent;
};

export default withWalletAuth;
