"use client";

import { useEffect, useState } from "react";
import { createMagic } from "@/lib/magic";
import React from "react";

const Settings = () => {
  const [isLoading, setIsLoading] = useState({
    email: true,
    user: true,
    saveChanges: false,
  });
  const [email, setEmail] = useState<string | null>(null);
  const [currentPubKey, setCurrentPubKey] = useState<string>();
  const [newPubKey, setNewPubKey] = useState<string>();
  const [currentName, setCurrentName] = useState<string>();
  const [newName, setNewName] = useState<string>();
  const magic = createMagic();

  const handleSaveChanges = async () => {
    if (newPubKey === currentPubKey && newName === currentName) return;
    setIsLoading((prevLoading) => ({ ...prevLoading, saveChanges: true }));
    try {
      const didToken = await magic?.user.getIdToken();
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${didToken}`,
        },
        body: JSON.stringify({ publicKey: newPubKey, userName: newName }),
      });

      const { user: user } = await response.json();

      if (user) {
        setCurrentPubKey(user.publicKey);
        setCurrentName(user.userName);
      }
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

  const fetchUser = async () => {
    try {
      const didToken = await magic?.user.getIdToken();
      const response = await fetch("/api/users/user", {
        headers: {
          Authorization: `Bearer ${didToken}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch products");

      const { user: user } = await response.json();

      if (user) {
        setCurrentPubKey(user.publicKey);
        setNewPubKey(user.publicKey);
        setCurrentName(user.userName);
        setNewName(user.userName);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      // You might want to show an error message to the user here
    } finally {
      setIsLoading((prevLoading) => ({ ...prevLoading, user: false }));
    }
  };

  useEffect(() => {
    fetchUser();
    fetchEmail();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="max-w-md">
        <div className="form-control mb-2">
          <label className="label" htmlFor="email">
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
        <div className="form-control mb-2">
          <label className="label" htmlFor="name">
            <span className="label-text">Name</span>
          </label>
          {isLoading.user ? (
            <div
              className="input input-bordered content-center text-neutral-content text-opacity-45 cursor-not-allowed ${
              skeleton rounded-lg"
            />
          ) : (
            <input
              type="text"
              id="name"
              placeholder={"Input your name"}
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="input input-bordered"
            />
          )}
        </div>
        <div className="form-control mb-6">
          <label className="label" htmlFor="wallet">
            <span className="label-text">Wallet Address</span>
          </label>
          {isLoading.user ? (
            <div
              className="input input-bordered content-center text-neutral-content text-opacity-45 cursor-not-allowed ${
              skeleton rounded-lg"
            />
          ) : (
            <input
              type="text"
              id="wallet"
              placeholder={"Input Solana wallet address to start"}
              value={newPubKey}
              onChange={(e) => setNewPubKey(e.target.value)}
              className="input input-bordered"
            />
          )}
        </div>
        <button
          className={`btn ${
            currentPubKey === newPubKey && currentName === newName
              ? "cursor-default"
              : "btn-primary"
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
