"use client";

import withAuth from "@/components/withAuth";
import React, { useState, useEffect } from "react";
import { createMagic } from "@/lib/magic";
import Image from "next/image";
import { Blink, EnhancedProduct, Product } from "@/lib/types";

const ProductBrowse = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<EnhancedProduct[]>([]);
  const [blinks, setBlinks] = useState<Blink[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const limit = 8; // 2x4 grid for large screens
  const magic = createMagic();

  const handleCreateBlink = async (
    productId: string,
    setIsButtonLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setIsButtonLoading(true);
    try {
      const didToken = await magic?.user.getIdToken();
      const response = await fetch("/api/blinks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${didToken}`,
        },
        body: JSON.stringify({ productId }),
      });

      const { blink } = (await response.json()) as { blink: Blink };
      if (blink) setBlinks((prevBlinks) => [...prevBlinks, blink]);
    } catch (error) {
      console.error("Error saving changes:", error);
      // You might want to show an error message to the user here
    } finally {
      setIsButtonLoading(false);
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
    try {
      const didToken = await magic?.user.getIdToken();
      const response = await fetch(`/api/blinks/user`, {
        headers: {
          Authorization: `Bearer ${didToken}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch products");

      const { blinks } = (await response.json()) as { blinks: Blink[] };
      if (blinks.length > 0) setBlinks(blinks);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchAllProducts = async () => {
    setIsLoading(true);
    try {
      const didToken = await magic?.user.getIdToken();
      const response = await fetch(`/api/products`, {
        headers: {
          Authorization: `Bearer ${didToken}`,
        },
      });

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
    <div className="p-6 relative min-h-full">
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
      const fullTextToCopy = `${currentDomain}/buy/${textToCopy}`
      await navigator.clipboard.writeText(fullTextToCopy);
      alert("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="card card-compact bg-base-300 shadow-2xl border border-base-100 hover:shadow-3xl transition-shadow duration-300">
      <figure>
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={300}
          height={200}
          className="rounded-y-xl object-cover h-48 w-full"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-base">{product.name}</h2>
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
              Copy affiliate Blink
            </button>
          ) : (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => handleCreateBlink(product.id, setIsButtonLoading)}
            >
              {isButtonLoading ? (
                <div className="loading loading-spinner" />
              ) : (
                "Create affiliate Blink"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductBrowse;
