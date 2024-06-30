"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { createMagic } from "@/lib/magic";
import { EnhancedProduct, Product } from "@/lib/types";
import Link from "next/link";

const BlinkRow: React.FC<{
  product: EnhancedProduct;
  onDelete: (
    id: string,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
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
          className="link link-hover"
        >
          <div className="flex flex-row gap-2 items-center">
            {product.name}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
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
      <td>{product.seller}</td>
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
      </td>
    </tr>
  );
};

const ProductTable: React.FC<{
  products: EnhancedProduct[];
  onDelete: (
    id: string,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
}> = ({ products, onDelete }) => (
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
          <BlinkRow key={product.id} product={product} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  </div>
);

const ProductManagement = () => {
  const [products, setProducts] = useState<EnhancedProduct[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gumroadUrl, setGumroadUrl] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchLoading, setIsFetchLoading] = useState(false);
  const magic = createMagic();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsFetchLoading(true);
    try {
      const didToken = await magic?.user.getIdToken();
      const response = await fetch("/api/blinks/user", {
        headers: {
          Authorization: `Bearer ${didToken}`,
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
  };

  const retrieveGumRoadInfo = async () => {
    if (!gumroadUrl) return;
    const extractedUrl = extractGumroadUrl(gumroadUrl);
    if (!extractedUrl) {
      throw new Error("Invalid Gumroad URL");
    }

    setIsLoading(true);
    try {
      const didToken = await magic?.user.getIdToken();
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${didToken}`,
        },
        body: JSON.stringify({ url: gumroadUrl }),
      });

      if (!response.ok) throw new Error("Failed to process product");

      const { product: product } = await response.json();
      setProducts([...products, product]);
    } catch (error) {
      console.error("Error fetching Gumroad product details:", error);
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  const extractGumroadUrl = (inputUrl: string): string | null => {
    try {
      const url = new URL(inputUrl);
      const hostname = url.hostname;
      const pathname = url.pathname;

      // Check if it's a valid Gumroad URL
      if (hostname.endsWith("gumroad.com") && pathname.startsWith("/l/")) {
        return `https://${hostname}${pathname}`;
      }
      return null;
    } catch (error) {
      console.error("Invalid URL:", error);
      return null;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    retrieveGumRoadInfo();
  };

  const handleDelete = async (
    id: string,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setIsLoading(true);
      const didToken = await magic?.user.getIdToken();
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${didToken}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete product");

      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 relative min-h-full">
      <h1 className="text-2xl font-bold mb-6">Manage Current Blinks</h1>
      <div className="mb-4">
        <Link
          href="/browse"
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          Create New Blink
        </Link>
      </div>
      {isFetchLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        <>
          <ProductTable products={products} onDelete={handleDelete} />

          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title justify-center mb-4">
                    Add New Product
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label className="block mb-2">Gumroad URL</label>
                      <div className="form-control mb-4">
                        <input
                          type="text"
                          name="gumroadUrl"
                          value={gumroadUrl || ""}
                          onChange={(e) => setGumroadUrl(e.target.value)}
                          className="input input-bordered w-full"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <button
                        type="button"
                        className="btn btn-outline mr-2"
                        onClick={() => setIsModalOpen(false)}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary">
                        {isLoading ? (
                          <div className="loading loading-spinner loading-md" />
                        ) : (
                          "Add Product"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductManagement;
