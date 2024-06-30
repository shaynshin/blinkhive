"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Product } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

const ProductCarousel = ({ products: products }: { products: Product[] }) => {
  return (
    <Swiper
      modules={[Autoplay, Navigation]}
      spaceBetween={20}
      slidesPerView={1}
      navigation
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 4,
        },
      }}
    >
      {products.map((product) => (
        <SwiperSlide key={product.id}>
          <div className="card card-compact bg-base-300 shadow-2xl border border-base-100 hover:shadow-3xl transition-shadow duration-300">
            <figure className="flex-shrink-0">
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
            <div className="card-body flex-grow flex flex-col">
              <a
                href={product.gumroadUrl}
                target="_blank"
                className="link link-hover"
              >
                <h2 className="card-title text-base line-clamp-2">
                  {product.name}
                </h2>
              </a>
              <div className="text-xs -mt-1.5 mb-0.5">
                {"⭐".repeat(Math.round(product.rating))}
              </div>
              <p className="text-sm text-gray-500 line-clamp-1">
                by {product.seller}
              </p>
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
                <Link href="/login" className="btn btn-primary btn-sm">
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
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductCarousel;
