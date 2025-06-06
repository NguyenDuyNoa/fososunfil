import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import IconCameraHeader from "../icon/IconCameraHeader";
import IconSearchHeader from "../icon/IconSearchHeader";
import CountryOptions from "../layout/header/CountryOptions";
import Image from "next/image";
import { IMAGES } from "@/constants/Images";
import { BiSolidRightArrow } from "react-icons/bi";
import DoubleArrowRightIcon from "../icons/DoubleArrowRight";

interface MobileMenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Category {
  id: string;
  name: string;
  image: string;
  ref: React.RefObject<HTMLDivElement>;
}

const MobileMenuOverlay: React.FC<MobileMenuOverlayProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [isManualSelect, setIsManualSelect] = useState<boolean>(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const rightContainerRef = useRef<HTMLDivElement>(null);
  const oilFilterRef = useRef<HTMLDivElement>(null);
  const airFilterRef = useRef<HTMLDivElement>(null);
  const fuelFilterRef = useRef<HTMLDivElement>(null);
  const fuelFilterRef1 = useRef<HTMLDivElement>(null);
  const fuelFilterRef2 = useRef<HTMLDivElement>(null);
  const oilFilterRef1 = useRef<HTMLDivElement>(null);
  const airFilterRef1 = useRef<HTMLDivElement>(null);
  const fuelFilterRef3 = useRef<HTMLDivElement>(null);

  const categories: Category[] = [
    {
      id: "oil",
      name: "Bộ lọc dầu",
      image: IMAGES.product12,
      ref: oilFilterRef,
    },
    {
      id: "air",
      name: "Bộ lọc không khí",
      image: IMAGES.product12,
      ref: airFilterRef,
    },
    {
      id: "fuel",
      name: "Bộ lọc nhiên liệu",
      image: IMAGES.product12,
      ref: fuelFilterRef,
    },
    {
      id: "fuel1",
      name: "Bộ lọc nhiên liệu1",
      image: IMAGES.product12,
      ref: fuelFilterRef1,
    },
    {
      id: "fuel2",
      name: "Bộ lọc nhiên liệu",
      image: IMAGES.product12,
      ref: fuelFilterRef2,
    },
    {
      id: "oil1",
      name: "Bộ lọc dầu",
      image: IMAGES.product12,
      ref: oilFilterRef1,
    },
    {
      id: "air1",
      name: "Bộ lọc không khí",
      image: IMAGES.product12,
      ref: airFilterRef1,
    },
    {
      id: "fuel3",
      name: "Bộ lọc nhiên liệu",
      image: IMAGES.product12,
      ref: fuelFilterRef3,
    },
  ];

  // Active category đầu tiên khi component mount
  useEffect(() => {
    if (categories.length > 0) {
      setActiveCategory(categories[0].id);
      setActiveIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (!rightContainerRef.current || isManualSelect) return;

      const containerRect = rightContainerRef.current.getBoundingClientRect();
      const containerTop = containerRect.top;
      const containerHeight = containerRect.height;

      let activeId = "";
      let minDistance = Infinity;

      categories.forEach((category) => {
        if (!category.ref.current) return;

        const elementRect = category.ref.current.getBoundingClientRect();
        const elementTop = elementRect.top - containerTop;
        const elementBottom = elementRect.bottom - containerTop;
        const elementCenter = (elementTop + elementBottom) / 2;
        
        const distance = Math.abs(elementCenter - containerHeight / 2);
        
        if (distance < minDistance) {
          minDistance = distance;
          activeId = category.id;
        }
      });

      if (activeId) {
        setActiveCategory(activeId);
        const index = categories.findIndex((cat) => cat.id === activeId);
        setActiveIndex(index);
      }
    };

    if (rightContainerRef.current) {
      rightContainerRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (rightContainerRef.current) {
        rightContainerRef.current.removeEventListener('scroll', handleScroll);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isManualSelect]);

  const handleCategoryClick = (category: string) => {
    setIsManualSelect(true);
    setActiveCategory(category);
    const selectedCategory = categories.find((cat) => cat.id === category);
    const index = categories.findIndex((cat) => cat.id === category);
    setActiveIndex(index);
    
    if (selectedCategory?.ref.current && rightContainerRef.current) {
      const element = selectedCategory.ref.current;
      const container = rightContainerRef.current;
      const elementTop = element.offsetTop;
      container.scrollTo({
        top: elementTop - 120,
        behavior: 'smooth'
      });

      // Reset isManualSelect sau khi cuộn xong
      setTimeout(() => {
        setIsManualSelect(false);
      }, 500);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-[60] bg-white overflow-hidden ${isOpen ? 'animate-slideIn' : 'animate-slideOut'}`}>
      {/* Header */}
      <div className="flex items-center gap-3 py-2 px-3 bg-brand-700">
        <button onClick={onClose} className="p-1">
          <X className="size-6 text-white" />
        </button>
        <div className="flex flex-row items-center w-full rounded-full p-1 pl-5 bg-white">
          <input
            type="text"
            placeholder="Tìm sản phẩm"
            className="flex-1 bg-transparent pt-0.5 text-disable-50 border-none outline-none placeholder:text-disable-50 text-sm/[24px] font-normal"
            // value={searchQuery}
            // onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="mr-2">
            <IconCameraHeader fill="#041F2F" className="size-6" />
          </button>
          <button className="bg-brand-500 rounded-full py-2 px-3">
            <IconSearchHeader fill="white" className="size-4" />
          </button>
        </div>
        <CountryOptions textColor="text-white" sizeIcon="size-6"/>
      </div>

      {/* Menu Content */}
      <div className="p-4 flex gap-4 justify-center bg-brand-800">
        <Link
          href="/about-us"
          className="text-sm font-medium text-white hover:text-brand-400"
          onClick={onClose}
        >
          Về Chúng Tôi
        </Link>
        <Link
          href="/categories"
          className="text-sm font-medium text-white hover:text-brand-400"
          onClick={onClose}
        >
          Catalogue
        </Link>
        <Link
          href="/blogs"
          className="text-sm font-medium text-white hover:text-brand-400"
          onClick={onClose}
        >
          Bài Viết
        </Link>
        <Link
          href="/contact-us"
          className="text-sm font-medium text-white hover:text-brand-400"
          onClick={onClose}
        >
          Liên Hệ
        </Link>
      </div>

      <div className="flex h-[calc(100vh-108px)] overflow-hidden">
        <div className="flex flex-col min-w-[90px] bg-white overflow-y-auto overscroll-contain">
          {categories.map((category, index) => (
            activeCategory === category.id ? (
              <div key={category.id} className="bg-brand-50">
                <div 
                  className="flex flex-col gap-1 p-3 pr-2 bg-white rounded-l-2xl cursor-pointer"
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                  <h3 className="text-xs font-semibold text-brand-700 capitalize w-[60px]">
                    {category.name}
                  </h3>
                </div>
              </div>
            ) : (
              <div 
                key={category.id}
                className={`flex flex-col gap-1 p-3 pr-2 bg-brand-50 ${
                  index === activeIndex - 1 ? "rounded-br-2xl" : 
                  index === activeIndex + 1 ? "rounded-tr-2xl" : 
                  ""
                } cursor-pointer`}
                onClick={() => handleCategoryClick(category.id)}
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
                <h3 className="text-xs font-semibold text-brand-700 capitalize w-[60px]">
                  {category.name}
                </h3>
              </div>
            )
          ))}
        </div>
        <div ref={rightContainerRef} className="flex flex-col gap-5 p-3 w-full overflow-y-auto h-full overscroll-contain">
          {categories.map((category) => (
            <div key={category.id} className="flex flex-col gap-3" ref={category.ref}>
              <div className="flex items-center gap-2 justify-between">
                <h3 className="text-sm font-semibold text-brand-700">
                  {category.name}
                </h3>
                <BiSolidRightArrow className="size-3 text-primary-new" />
              </div>
              <hr className="border-[#919EAB33]" />
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 justify-between">
                  <h4 className="text-sm font-bold text-grey-800">
                    Sub category 1
                  </h4>
                  <button className="flex items-center gap-1">
                    <span className="text-[10px] font-semibold text-brand-500 pt-0.5">
                      Xem tất cả
                    </span>
                    <DoubleArrowRightIcon className="text-brand-500 size-3 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-y-2 gap-x-4">
                  <div className="flex flex-col justify-center items-center gap-2">
                    <Image
                      src={IMAGES.product}
                      alt="logo"
                      width={70}
                      height={70}
                      className="object-cover rounded-lg"
                    />
                    <h5 className="text-xs text-center font-medium text-primary-new">
                      Bộ lọc gió
                    </h5>
                  </div>
                  <div className="flex flex-col justify-center items-center gap-2">
                    <Image
                      src={IMAGES.product6}
                      alt="logo"
                      width={70}
                      height={70}
                      className="object-cover rounded-lg"
                    />
                    <h5 className="text-xs text-center font-medium text-primary-new">
                      Bộ lọc trong cabin
                    </h5>
                  </div>
                  <div className="flex flex-col justify-center items-center gap-2">
                    <Image
                      src={IMAGES.product3}
                      alt="logo"
                      width={70}
                      height={70}
                      className="object-cover rounded-lg"
                    />
                    <h5 className="text-xs text-center font-medium text-primary-new">
                      Bộ lọc nhiên liệu
                    </h5>
                  </div>
                  <div className="flex flex-col justify-center items-center gap-2">
                    <Image
                      src={IMAGES.product11}
                      alt="logo"
                      width={70}
                      height={70}
                      className="object-cover rounded-lg"
                    />
                    <h5 className="text-xs text-center font-medium text-primary-new">
                      Bộ lọc gió
                    </h5>
                  </div>
                  <div className="flex flex-col justify-center items-center gap-2">
                    <Image
                      src={IMAGES.product8}
                      alt="logo"
                      width={70}
                      height={70}
                      className="object-cover rounded-lg"
                    />
                    <h5 className="text-xs text-center font-medium text-primary-new">
                      Bộ lọc gió
                    </h5>
                  </div>
                  <div className="flex flex-col justify-center items-center gap-2">
                    <Image
                      src={IMAGES.product13}
                      alt="logo"
                      width={70}
                      height={70}
                      className="object-cover rounded-lg"
                    />
                    <h5 className="text-xs text-center font-medium text-primary-new">
                      Bộ lọc gió
                    </h5>
                  </div>
                  <div className="flex flex-col justify-center items-center gap-2">
                    <Image
                      src={IMAGES.product5}
                      alt="logo"
                      width={70}
                      height={70}
                      className="object-cover rounded-lg"
                    />
                    <h5 className="text-xs text-center font-medium text-primary-new">
                      Bộ lọc gió
                    </h5>
                  </div>
                  <div className="flex flex-col justify-center items-center gap-2">
                    <Image
                      src={IMAGES.product4}
                      alt="logo"
                      width={70}
                      height={70}
                      className="object-cover rounded-lg"
                    />
                    <h5 className="text-xs text-center font-medium text-primary-new">
                      Bộ lọc gió
                    </h5>
                  </div>
                  <div className="flex flex-col justify-center items-center gap-2">
                    <Image
                      src={IMAGES.product12}
                      alt="logo"
                      width={70}
                      height={70}
                      className="object-cover rounded-lg"
                    />
                    <h5 className="text-xs text-center font-medium text-primary-new">
                      Bộ lọc gió
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileMenuOverlay;
