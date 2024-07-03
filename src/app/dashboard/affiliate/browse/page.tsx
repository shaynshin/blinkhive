"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Blink, EnhancedProduct, Product } from "@/lib/types";
import { useWallet } from "@jup-ag/wallet-adapter";
import { getOrCreateAndSetStorageMessage } from "@/lib/walletAuth";

const ProductBrowse = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<EnhancedProduct[]>([]);
  const [blinks, setBlinks] = useState<Blink[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const limit = 8; // 2x4 grid for large screens
  const wallet = useWallet();

  const handleCreateBlink = async (
    productId: string,
    setIsButtonLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
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
        setIsButtonLoading(true);

        const response = await fetch("/api/blinks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Verification": verificationStr,
            "X-Signature": signatureStr,
            "X-Pubkey": wallet.publicKey.toBase58(),
          },
          body: JSON.stringify({ productId }),
        });

        if (response.status !== 200) {
          throw "failed to save";
        }

        const { blink } = (await response.json()) as { blink: Blink };
        if (blink) setBlinks((prevBlinks) => [...prevBlinks, blink]);
      } catch (error) {
        console.error("Error saving changes:", error);
      } finally {
        setIsButtonLoading(false);
      }
    } else {
      alert(
        "ERROR: Please connect your wallet at the top right and sign the message!"
      );
    }
  };

  const enhanceProducts = (allProducts: Product[], blinks: Blink[]) => {
    const blinksMap = new Map(
      blinks.map((blink) => [blink.productId, blink.id])
    );
    const enhancedProducts = allProducts.map((product) => ({
      ...product,
      blinkId: blinksMap.get(product.id) || null,
    }));
    setProducts(enhancedProducts);
  };

  const fetchUserBlinks = async () => {
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
        const response = await fetch(`/api/blinks/user`, {
          headers: {
            "Content-Type": "application/json",
            "X-Verification": verificationStr,
            "X-Signature": signatureStr,
            "X-Pubkey": wallet.publicKey.toBase58(),
          },
        });

        if (!response.ok) throw new Error("Failed to fetch products");

        const { blinks } = (await response.json()) as { blinks: Blink[] };
        if (blinks.length > 0) setBlinks(blinks);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    } else {
      setBlinks([]);
    }
  };

  const fetchAllProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/products`);

      if (!response.ok) throw new Error("Failed to fetch products");

      const data = await response.json();
      setAllProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (allProducts.length > 0 || blinks.length > 0) {
      enhanceProducts(allProducts, blinks);
    }
  }, [allProducts, blinks]);

  useEffect(() => {
    fetchUserBlinks();
  }, [wallet]);

  useEffect(() => {
    fetchAllProducts();
    fetchUserBlinks();
  }, []);

  const decrementPage = () => {
    if (page === 1) return;
    setPage((currentPage) => currentPage - 1);
    window.scrollTo(0, 0);
  };

  const incrementPage = () => {
    if (page === Math.ceil(products.length / limit)) return;
    setPage((currentPage) => currentPage + 1);
    window.scrollTo(0, 0);
  };

  return (
    <div className="relative min-h-full">
      <h1 className="text-2xl font-bold mb-6">Browse Products</h1>
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.slice((page - 1) * 8, page * 8).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                handleCreateBlink={handleCreateBlink}
              />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <div className="join">
              <button className="join-item btn" onClick={decrementPage}>
                {" "}
                &lt;{" "}
              </button>
              <button className="join-item btn cursor-default">
                Page {page}
              </button>
              <button className="join-item btn" onClick={incrementPage}>
                {" "}
                &gt;
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const ProductCard: React.FC<{
  product: EnhancedProduct;
  handleCreateBlink: (
    productId: string,
    setIsButtonLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
}> = ({ product, handleCreateBlink }) => {
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
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
    <div className="card card-compact bg-base-300 shadow-2xl border border-base-100 hover:shadow-3xl transition-shadow duration-300">
      <figure>
        <a href={product.gumroadUrl} target="_blank" className="w-full">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={300}
            height={200}
            className="rounded-y-xl object-cover h-48 w-full"
          />
        </a>
      </figure>
      <div className="card-body">
        <a
          href={product.gumroadUrl}
          target="_blank"
          className="link link-hover"
        >
          <h2 className="card-title text-base">{product.name}</h2>
        </a>
        <div className="text-xs -mt-1.5 mb-0.5">
          {"⭐".repeat(Math.round(product.rating))}
        </div>
        <p className="text-sm text-gray-500">by {product.seller}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="font-bold">${product.price.toFixed(2)}</span>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">
              {product.commission * 80}%
              <span className="text-xs"> &nbsp;commission</span>
            </div>
          </div>
        </div>
        <div className="card-actions justify-start mt-4">
          {product.blinkId ? (
            <button
              className="btn btn-accent btn-sm"
              onClick={() => {
                if (product.blinkId) handleCopyClick(product.blinkId);
              }}
            >
              Copy Blink
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
          ) : (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => handleCreateBlink(product.id, setIsButtonLoading)}
            >
              {isButtonLoading ? (
                <div className="loading loading-spinner" />
              ) : (
                <>
                  Create affiliate Blink
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.7917 15.7991L14.2223 14.3676C16.5926 11.9959 16.5926 8.15054 14.2223 5.7788C11.8521 3.40707 8.0091 3.40707 5.63885 5.7788L2.77769 8.64174C0.407436 11.0135 0.407436 14.8588 2.77769 17.2306C3.87688 18.3304 5.29279 18.9202 6.73165 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    ></path>
                    <path
                      d="M21.2223 15.3583C23.5926 12.9865 23.5926 9.14118 21.2223 6.76945C20.1231 5.66957 18.7072 5.07976 17.2683 5M18.3612 18.2212C15.9909 20.5929 12.1479 20.5929 9.77769 18.2212C7.40744 15.8495 7.40744 12.0041 9.77769 9.63239L11.2083 8.20092"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductBrowse;
