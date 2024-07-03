// pages/products.tsx
import { GetServerSideProps } from "next";
import { Product } from "@/lib/types";
import ProductCarousel from "./ProductCarousel";

async function getProducts(): Promise<Product[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/products/recent`, {
    next: { revalidate: 1800 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await res.json();
  return data.products;
}

const Products: React.FC = async () => {
  const products = await getProducts();

  return (
    <section className="py-12 bg-base-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Recently Added Products
        </h2>
        <ProductCarousel products={products} />
      </div>
    </section>
  );
};

export default Products;
