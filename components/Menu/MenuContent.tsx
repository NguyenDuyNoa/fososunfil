import ProductCard from "@/components/productCard";
import { IMAGES } from "@/constants/Images";
import { cn } from "@/lib/utils";
import { MenuItem } from "@/types/categories/ICategoryes";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const productImages = [
  IMAGES.product9,
  IMAGES.product10,
  IMAGES.product11,
  IMAGES.product12,
  IMAGES.product13,
  IMAGES.product14,
  IMAGES.product15,
  IMAGES.product16,
];

type MegaMenuContentProps = {
  classNameContent?: string;
  classNameSubItem?: string;
  classNameActiveItem?: string;
  activeItem: MenuItem | null;
  items: MenuItem[];
  IsProducts?: boolean;
  setActiveItem: (item: MenuItem | null) => void;
  onClose: () => void;
  onHover: () => void;
  isBanner?: boolean;
  isMiniHeader?: boolean;
  autoActiveFirstItem?: boolean;
};

const MenuContent = ({
  classNameContent = "",
  classNameSubItem = "",
  activeItem,
  items = [],
  IsProducts = false,
  setActiveItem,
  onClose,
  onHover,
  isBanner = false,
  classNameActiveItem = "",
  isMiniHeader,
  autoActiveFirstItem = true,
}: MegaMenuContentProps) => {
  const pathname = usePathname();

  useEffect(() => {
    if (items.length > 0 && !activeItem && autoActiveFirstItem) {
      setActiveItem(items[0]);
    }
  }, [items, activeItem, setActiveItem, autoActiveFirstItem]);

  const productCards = Array(isMiniHeader ? 4 : 5)
    .fill(0)
    .map((_, index) => (
      <ProductCard
        key={index}
        imageSrc={productImages[index]}
        classNameImage="size-[150px]"
        isBanner={true}
        className="mb-0"
      />
    ));
  return (
    <>
      {/* Overlay blur layer home */}
      {activeItem && (
        <div
          className={cn(
            "fixed left-0 right-0 bottom-0 top-0 bg-black/25 backdrop-blur-sm pointer-events-none",
            pathname === "/" ? "z-[10]" : "z-[-1]",
            isMiniHeader && "z-[-1]"
          )}
        />
      )}
      <div
        className={cn(
          " min-w-[250px] rounded-tl-sm rounded-bl-sm rounded-br-none z-20 p-0 border-none min-h-[600px] shadow-none bg-white",
          !isBanner && "absolute top-[calc(100%+16px)] left-0",
          isMiniHeader && "absolute top-[calc(100%+20px)] left-0",
          classNameContent
        )}
        onMouseEnter={onHover}
        onMouseLeave={onClose}
      >
        <div className="divide-y h-full flex flex-col gap-3 overflow-y-scroll rounded-bl-lg">
          {items.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => setActiveItem(item)}
              className={cn(
                "h-[66px] cursor-pointer flex items-center gap-2 p-4 w-full text-left border-l-2 bg-white border-t-white border-l-white",
                activeItem?.id === item.id &&
                  " border-l-brand-700 text-brand-700 bg-disable-100",
                classNameSubItem
              )}
            >
              {item.icon && item.icon}
              <span className="text-left">{item.name}</span>
              <ChevronRight className="ml-auto w-4 h-4" />
            </div>
          ))}
        </div>

        {activeItem && (
          <div
            className={cn(
              "absolute left-full top-0 bottom-0 xxl:min-w-[1000px] xl:min-w-[900px] min-w-[700px] w-fit min-h-full bg-[#F4F6F8] p-6 rounded-tr-sm rounded-br-sm flex flex-col ",
              isMiniHeader && "xxl:min-w-[800px] xl:min-w-[750px] min-w-[600px]"
            )}
          >
            <div className="overflow-y-scroll">
              {activeItem?.subItems && (
                <div className="grid grid-cols-3 xxl:gap-4 xl:gap-2 gap-1 xxl:mb-2 mb-1 border-b border-[#919EAB] border-opacity-25 pb-4">
                  {activeItem?.subItems?.map((sub, index) => (
                    <div
                      key={index}
                      className="transition transform duration-200 text-[#1C252E] bg-white rounded-xl px-4 py-3 text-center flex xl:gap-x-4 gap-x-2 items-center justify-start cursor-pointer border border-transparent hover:border-brand-650 group"
                    >
                      <div>
                        <Image
                          src={sub.image}
                          alt={`image-${index}`}
                          width={200}
                          height={200}
                          className="size-[70px] object-contain aspect-square"
                        />
                      </div>
                      <p className="font-semibold text-base group-hover:text-brand-650 transition-colors duration-200 text-left">
                        {sub.name}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {IsProducts && (
                <div className="mt-4 flex-1">
                  <div className="flex flex-col h-full w-full">
                    <div className="flex flex-row justify-between items-center">
                      <h3 className="text-2xl font-bold mb-2 text-[#1C252E]">
                        Sản Phẩm Bán Chạy
                      </h3>
                      <Link
                        href="/products"
                        className="cursor-pointer font-semibold text-brand-500 text-base transform transition duration-200 hover:scale-105"
                      >
                        Xem tất cả
                      </Link>
                    </div>
                    <div className="flex-1 flex xxl:gap-3 xl:gap-2 gap-1">
                      {productCards}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MenuContent;
