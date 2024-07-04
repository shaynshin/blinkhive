"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { createMagic } from "@/lib/magic";
import { Product } from "@/lib/types";

const ProductRow: React.FC<{
  product: Product;
  onDelete: (
    id: string,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
}> = ({ product, onDelete }) => {
  const [isLoading, setIsLoading] = useState(false);
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
      <td>{product.name}</td>
      <td>{product.seller}</td>
      <td>{product.commission * 100}%</td>
      <td>
        <div className="flex gap-2">
          <a
            href={product.gumroadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-primary"
          >
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
          </a>
          <button
            className="btn btn-sm btn-error"
            onClick={() => onDelete(product.id, setIsLoading)}
          >
            {isLoading ? (
              <div className="loading loading-spinner" />
            ) : (
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            )}
          </button>
        </div>
      </td>
    </tr>
  );
};

const ProductTable: React.FC<{
  products: Product[];
  onDelete: (
    id: string,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
}> = ({ products, onDelete }) => (
  <div className="overflow-x-auto">
    <table className="table table-zebra w-full">
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Seller</th>
          <th>Commission</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <ProductRow key={product.id} product={product} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  </div>
);

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
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
      const response = await fetch("/api/products/user", {
        headers: {
          Authorization: `Bearer ${didToken}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch products");

      const { products: products } = await response.json();

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
    <div className="relative min-h-full">
      <h1 className="text-2xl font-bold mb-6">Product Management</h1>
      <div className="mb-4">
        <button
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          Add New Product
        </button>
      </div>
      {isFetchLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="loading loading-bars loading-lg text-info"></span>
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
