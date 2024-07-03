"use client";

import { UnifiedWalletProvider } from "@jup-ag/wallet-adapter";

const WalletWrapper = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const WalletComponent = (props: any) => (
    <UnifiedWalletProvider
      wallets={[]}
      config={{
        autoConnect: false,
        env: "mainnet-beta",
        metadata: {
          name: "UnifiedWallet",
          description: "UnifiedWallet",
          url: "https://jup.ag",
          iconUrls: ["https://jup.ag/favicon.ico"],
        },
        walletlistExplanation: {
          href: "https://station.jup.ag/docs/additional-topics/wallet-list",
        },
        theme: "jupiter",
        lang: "en",
      }}
    >
      <WrappedComponent {...props} />
    </UnifiedWalletProvider>
  );

  // Set display name for the HOC for better debugging messages
  WalletComponent.displayName = `WalletComponent(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;

  return WalletComponent;
};

export default WalletWrapper;
