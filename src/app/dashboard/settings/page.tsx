"use client";

import { useEffect, useState } from "react";
import { createMagic } from "@/lib/magic";
import React from "react";

const Settings = () => {
  const [isLoading, setIsLoading] = useState({
    email: true,
    wallet: true,
    saveChanges: false,
  });
  const [email, setEmail] = useState<string | null>(null);
  const [currentPubKey, setCurrentPubKey] = useState<string>();
  const [newPubKey, setNewPubKey] = useState<string>();
  const magic = createMagic();

  const handleSaveChanges = async () => {
    if (newPubKey === currentPubKey) return;
    setIsLoading((prevLoading) => ({ ...prevLoading, saveChanges: true }));
    try {
      const didToken = await magic?.user.getIdToken();
      const response = await fetch("/api/wallet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${didToken}`,
        },
        body: JSON.stringify({ publicKey: newPubKey }),
      });

      const { wallet: wallet } = await response.json();

      if (wallet) setCurrentPubKey(wallet.publicKey);
    } catch (error) {
      console.error("Error saving changes:", error);
      // You might want to show an error message to the user here
    } finally {
      setIsLoading((prevLoading) => ({ ...prevLoading, saveChanges: false }));
    }
  };

  const fetchEmail = async () => {
    const metadata = await magic?.user.getMetadata();
    setEmail(metadata ? metadata.email : null);
    setIsLoading({ ...isLoading, email: false });
  };

  const fetchWallet = async () => {
    try {
      const didToken = await magic?.user.getIdToken();
      const response = await fetch("/api/wallet/user", {
        headers: {
          Authorization: `Bearer ${didToken}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch products");

      const { wallet: wallet } = await response.json();

      if (wallet) {
        setCurrentPubKey(wallet.publicKey);
        setNewPubKey(wallet.publicKey);
      }
    } catch (error) {
      console.error("Error fetching wallet:", error);
      // You might want to show an error message to the user here
    } finally {
      setIsLoading((prevLoading) => ({ ...prevLoading, wallet: false }));
    }
  };

  useEffect(() => {
    fetchWallet();
    fetchEmail();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="max-w-md">
        <div className="form-control mb-4">
          <label className="label" htmlFor="wallet">
            <span className="label-text">Email</span>
          </label>
          <div
            className={`input input-bordered content-center text-neutral-content text-opacity-45 cursor-not-allowed ${
              isLoading.email ? "skeleton rounded-lg" : ""
            }`}
          >
            {email}
          </div>
        </div>
        <div className="form-control mb-6">
          <label className="label" htmlFor="wallet">
            <span className="label-text">Wallet Address</span>
          </label>
          {isLoading.wallet ? (
            <div
              className="input input-bordered content-center text-neutral-content text-opacity-45 cursor-not-allowed ${
              skeleton rounded-lg"
            />
          ) : (
            <input
              type="text"
              id="wallet"
              placeholder={"Input Solana wallet to start"}
              value={newPubKey}
              onChange={(e) => setNewPubKey(e.target.value)}
              className="input input-bordered"
            />
          )}
        </div>
        <button
          className={`btn ${
            currentPubKey === newPubKey ? "cursor-default" : "btn-primary"
          }`}
          onClick={handleSaveChanges}
        >
          {isLoading.saveChanges ? (
            <div className="loading loading-spinner loading-md" />
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </div>
  );
};

export default Settings;
