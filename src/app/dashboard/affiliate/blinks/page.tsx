"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { createMagic } from "@/lib/magic";
import { EnhancedProduct } from "@/lib/types";
import Link from "next/link";
import { getOrCreateAndSetStorageMessage } from "@/lib/walletAuth";
import { useWallet } from "@jup-ag/wallet-adapter";

const BlinkRow: React.FC<{
  product: EnhancedProduct;
}> = ({ product }) => {
  const handleCopyClick = async (textToCopy: string) => {
    try {
      const currentDomain = `${window.location.protocol}//${window.location.host}`;
      const fullTextToCopy = `${currentDomain}/buy/${textToCopy}`;
      await navigator.clipboard.writeText(fullTextToCopy);
      alert("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <tr key={product.id}>
      <td>
        <div className="avatar">
          <div className="mask mask-squircle w-12 h-12">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={48}
              height={48}
            />
          </div>
        </div>
      </td>
      <td>
        <a
          href={product.gumroadUrl}
          target="_blank"
          className="link link-hover flex"
        >
          <div className="flex flex-row gap-2 items-center">
            <p className="line-clamp-2">{product.name}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 hidden sm:block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </div>
        </a>
      </td>
      <td>
        <p className="line-clamp-2">{product.seller}</p>
      </td>
      <td>
        {product.rating === 0 ? (
          "NA"
        ) : (
          <div className="text-xs">
            {"⭐".repeat(Math.round(product.rating))}
          </div>
        )}
      </td>
      <td>{product.commission * 80}%</td>
      <td>
        <button
          onClick={() => {
            if (product.blinkId) handleCopyClick(product.blinkId);
          }}
          className="btn btn-sm btn-accent"
        >
          <span className="hidden sm:block">Copy Blink</span>
          <svg
            className="h-3.5 w-3.5"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 210.107 210.107"
            fill="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M168.506,0H80.235C67.413,0,56.981,10.432,56.981,23.254v2.854h-15.38 c-12.822,0-23.254,10.432-23.254,23.254v137.492c0,12.822,10.432,23.254,23.254,23.254h88.271 c12.822,0,23.253-10.432,23.253-23.254V184h15.38c12.822,0,23.254-10.432,23.254-23.254V23.254C191.76,10.432,181.328,0,168.506,0z M138.126,186.854c0,4.551-3.703,8.254-8.253,8.254H41.601c-4.551,0-8.254-3.703-8.254-8.254V49.361 c0-4.551,3.703-8.254,8.254-8.254h88.271c4.551,0,8.253,3.703,8.253,8.254V186.854z M176.76,160.746 c0,4.551-3.703,8.254-8.254,8.254h-15.38V49.361c0-12.822-10.432-23.254-23.253-23.254H71.981v-2.854 c0-4.551,3.703-8.254,8.254-8.254h88.271c4.551,0,8.254,3.703,8.254,8.254V160.746z"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
};

const ProductTable: React.FC<{
  products: EnhancedProduct[];
}> = ({ products }) => (
  <div className="overflow-x-auto">
    <table className="table table-zebra w-full">
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Seller</th>
          <th>Rating</th>
          <th>Commission</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <BlinkRow key={product.id} product={product} />
        ))}
      </tbody>
    </table>
  </div>
);

const ProductManagement = () => {
  const [products, setProducts] = useState<EnhancedProduct[]>([]);
  const [isFetchLoading, setIsFetchLoading] = useState(false);
  const wallet = useWallet();

  useEffect(() => {
    fetchProducts();
  }, [wallet]);

  const fetchProducts = async () => {
    const { verificationStr, signatureStr } =
      await getOrCreateAndSetStorageMessage(wallet);
    if (
      wallet &&
      wallet.connected &&
      !wallet.disconnecting &&
      wallet.publicKey &&
      verificationStr &&
      signatureStr
    ) {
      try {
        setIsFetchLoading(true);
        const response = await fetch("/api/blinks/user", {
          headers: {
            "Content-Type": "application/json",
            "X-Verification": verificationStr,
            "X-Signature": signatureStr,
            "X-Pubkey": wallet.publicKey.toBase58(),
          },
        });

        if (!response.ok) throw new Error("Failed to fetch products");

        const { blinks: blinks } = await response.json();

        const products: EnhancedProduct[] = blinks.map((blink: any) => ({
          id: blink.productId,
          name: blink.productName,
          price: blink.productPrice,
          rating: blink.productRating,
          seller: blink.productSeller,
          imageUrl: blink.productImageUrl,
          commission: blink.productCommission,
          gumroadUrl: blink.productGumroadUrl,
          blinkId: blink.id,
        }));

        setProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
        // You might want to show an error message to the user here
      } finally {
        setIsFetchLoading(false);
      }
    } else {
      setProducts([]);
    }
  };

  return (
    <div className="relative min-h-full">
      <h1 className="text-2xl font-bold mb-6">Manage Current Blinks</h1>
      <div className="mb-4">
        <Link href="/browse" className="btn btn-primary">
          Create New Blink
        </Link>
      </div>
      {isFetchLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        <ProductTable products={products} />
      )}
    </div>
  );
};

export default ProductManagement;
