import ArrowUpIcon from "@/components/icons/ArrowUpIcon";
import ProductCard from "@/components/productCard";
import { IMAGES } from "@/constants/Images";
import React, { useState } from "react";

const productImages = [
  IMAGES.product6,
  IMAGES.product7,
  IMAGES.product8,
  IMAGES.product9,
  IMAGES.product10,
  IMAGES.product11,
  IMAGES.product7,
  IMAGES.product8,
  IMAGES.product,
  IMAGES.product11,
  IMAGES.product7,
  IMAGES.product8,
  IMAGES.product9,
  IMAGES.product10,
  IMAGES.product11,
  IMAGES.product6,
  IMAGES.product7,
  IMAGES.product8,
  IMAGES.product9,
  IMAGES.product10,
  IMAGES.product11,
  IMAGES.product7,
  IMAGES.product8,
  IMAGES.product,
  IMAGES.product11,
  IMAGES.product7,
  IMAGES.product8,
  IMAGES.product9,
  IMAGES.product10,
  IMAGES.product11,
];

const ProductSection = () => {
  const [activeFilter, setActiveFilter] = useState("Liên quan");

  const filters = ["Liên quan", "Bán chạy", "Mới nhất", "Nổi bật"];

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="w-full flex items-center justify-between pb-2">
        <h2 className="text-xl font-semibold text-primary-new">
          Danh sách sản phẩm
        </h2>
        <div className="flex items-center gap-6">
          <span className="text-primary-new font-medium text-base">
            Sắp xếp theo
          </span>
          <div className="flex gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                className={`relative px-4 py-2 rounded-lg font-bold bg-white border overflow-hidden ${
                  activeFilter === filter
                    ? " border-brand-500 text-brand-500 "
                    : " border-transparent text-primary-new hover:border-brand-400"
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
                {activeFilter === filter && (
                  <div className="absolute -top-[1px] -right-[1px]">
                    <div
                      style={{
                        width: "24px",
                        height: "24px",
                        backgroundColor: "var(--brand-500, #2563eb)",
                        clipPath: "polygon(0 0, 100% 0, 100% 100%)",
                        position: "relative",
                      }}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "7px",
                          transform: "translate(50%, -50%)",
                        }}
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M9.24663 3.46751C9.40264 3.60372 9.41871 3.84061 9.2825 3.99663L5.35393 8.49663C5.28271 8.5782 5.17972 8.62501 5.07143 8.62501C4.96315 8.62501 4.86015 8.5782 4.78894 8.49663L3.21751 6.69663C3.08131 6.54061 3.09737 6.30372 3.25338 6.16751C3.4094 6.03131 3.64629 6.04737 3.7825 6.20338L5.07143 7.6798L8.71751 3.50338C8.85372 3.34737 9.09061 3.33131 9.24663 3.46751Z"
                          fill="white"
                          stroke="white"
                          stroke-linecap="round"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-2 py-2 rounded-lg border border-transparent text-gray-700 hover:border-brand-400">
            <span>Giá: Thấp → Cao</span>
            <ArrowUpIcon className="size-5 rotate-180" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {Array(30)
          .fill(0)
          .map((_, index) => (
            <ProductCard key={index} imageSrc={productImages[index]} />
          ))}
      </div>
    </div>
  );
};

export default ProductSection;
