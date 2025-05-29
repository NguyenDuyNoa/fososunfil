"use client";
import ArrowUpIcon from "@/components/icons/ArrowUpIcon";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface ImageItem {
  // id: number;
  src: string;
  // alt: string;
}

const Gallery = ({ data }: { data: any }) => {
  const [images, setImages] = useState<ImageItem[]>(data);
  useEffect(() => {
    setImages(data);
  }, [data]);
  // const images: ImageItem[] = [
  //   { id: 1, src: IMAGES.product1, alt: "Bộ lọc không khí 1" },
  //   { id: 2, src: IMAGES.product2, alt: "Bộ lọc dầu 1" },
  //   { id: 3, src: IMAGES.product3, alt: "Bộ lọc cabin 1" },
  //   { id: 4, src: IMAGES.product4, alt: "Bộ lọc dầu 2" },
  //   { id: 5, src: IMAGES.product5, alt: "Bộ lọc không khí 2" },
  //   // { id: 6, src: IMAGES.product6, alt: "Bộ lọc nhiên liệu 1" },
  //   // { id: 7, src: IMAGES.product6, alt: "Bộ lọc nhiên liệu 1" },
  //   // { id: 8, src: IMAGES.product8, alt: "Bộ lọc nhiên liệu 1" },
  //   // { id: 9, src: IMAGES.product9, alt: "Bộ lọc nhiên liệu 1" },
  // ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);
  const thumbnailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const [imageHeight, setImageHeight] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    setSelectedThumbnail((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
    setSelectedThumbnail((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
    setSelectedThumbnail(index);
  };

  // Cuộn đến thumbnail được chọn
  useEffect(() => {
    if (
      thumbnailRefs.current[selectedThumbnail] &&
      thumbnailContainerRef.current
    ) {
      const container = thumbnailContainerRef.current;
      const thumbnail = thumbnailRefs.current[selectedThumbnail];

      // Tính toán vị trí cuộn để đưa thumbnail vào giữa container
      const containerRect = container.getBoundingClientRect();
      const thumbnailRect = thumbnail.getBoundingClientRect();

      const isVertical = window.innerWidth >= 768; // Kiểm tra nếu là layout dọc (md breakpoint)

      if (isVertical) {
        // Cuộn theo chiều dọc
        const thumbnailTop = thumbnail.offsetTop - container.offsetTop;
        const thumbnailHeight = thumbnailRect.height;
        const containerHeight = containerRect.height;

        // Tính toán vị trí để thumbnail nằm chính giữa
        let centerPosition =
          thumbnailTop - (containerHeight - thumbnailHeight) / 2;

        // Đảm bảo không cuộn quá đầu container
        centerPosition = Math.max(0, centerPosition);

        // Đảm bảo không cuộn quá cuối container
        const maxScroll = container.scrollHeight - containerHeight;
        centerPosition = Math.min(maxScroll, centerPosition);
        container.scrollTo({
          top: centerPosition,
          behavior: "smooth",
        });
      } else {
        // Cuộn theo chiều ngang
        const thumbnailLeft = thumbnail.offsetLeft;
        const thumbnailWidth = thumbnailRect.width;
        const containerWidth = containerRect.width;

        // Tính toán vị trí để thumbnail nằm chính giữa
        let centerPosition =
          thumbnailLeft - (containerWidth - thumbnailWidth) / 2;

        // Đảm bảo không cuộn quá đầu container
        centerPosition = Math.max(0, centerPosition);

        // Đảm bảo không cuộn quá cuối container
        const maxScroll = container.scrollWidth - containerWidth;
        centerPosition = Math.min(maxScroll, centerPosition);

        container.scrollTo({
          left: centerPosition,
          behavior: "smooth",
        });
      }
    }
  }, [selectedThumbnail]);

  // Tính toán chiều cao của hình ảnh
  useEffect(() => {
    if (mainImageRef.current) {
      const updateImageHeight = () => {
        const height = mainImageRef.current?.offsetHeight || 0;
        setImageHeight(height);
      };

      updateImageHeight();
      window.addEventListener("resize", updateImageHeight);

      return () => {
        window.removeEventListener("resize", updateImageHeight);
      };
    }
  }, []);

  return (
    <div className="flex flex-col gap-6 flex-1 xl:w-1/2">
      {/* Main Image */}
      <div
        ref={mainImageRef}
        className="relative w-full aspect-[677/508] xl:rounded-xl overflow-hidden bg-white"
      >
        <Image
          src={images?.[currentIndex] as any}
          alt=""
          width={1000}
          height={1000}
          className="object-cover w-full h-full"
        />

        {/* Image counter */}
        <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-[#1C252E] text-white px-0.5 py-0.5 rounded-lg text-sm font-semibold">
          <button
            className="p-[5px] hover:bg-white/20 rounded-md transition-all duration-300"
            onClick={handlePrevious}
          >
            <ArrowUpIcon className="size-[18px] -rotate-90" />
          </button>
          {currentIndex + 1} / {images?.length}
          <button
            className="p-[5px] hover:bg-white/20 rounded-md transition-all duration-300"
            onClick={handleNext}
          >
            <ArrowUpIcon className="size-[18px] rotate-90 " />
          </button>
        </div>
      </div>

      {/* Thumbnails */}
      <div
        ref={thumbnailContainerRef}
        className="flex flex-shrink-0 flex-row gap-3 overflow-auto max-w-full px-3 xl:px-0"
        // style={{ maxHeight: imageHeight }}
      >
        {images?.map((image: ImageItem, index: number) => (
          <div
            key={index}
            ref={(el) => {
              thumbnailRefs.current[index] = el;
            }}
            className={`relative w-[107px] xl:w-[140px] aspect-[140/105] flex-shrink-0 border-2 rounded-lg cursor-pointer overflow-hidden
              ${
                selectedThumbnail === index
                  ? "border-blue-500"
                  : "border-transparent"
              }`}
            onClick={() => handleThumbnailClick(index)}
          >
            <div className="relative w-full h-full">
              <Image
                src={image as any}
                alt=""
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
