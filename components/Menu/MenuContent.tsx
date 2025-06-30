import ProductCard from "@/components/productCard";
import { cn } from "@/lib/utils";
import { useGetListCategory } from "@/managers/api-management/products/useGetProductCategory";
import { MenuItem } from "@/types/categories/ICategoryes";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

type MegaMenuContentProps = {
  classNameContent?: string;
  classNameSubItem?: string;
  onClose: () => void;
  onHover: () => void;
  isBanner?: boolean;
  isMiniHeader?: boolean;
  autoActiveFirstItem?: boolean;
};

const MenuContent = ({
  classNameContent = "",
  classNameSubItem = "",
  onClose,
  onHover,
  isBanner = false,
  isMiniHeader,
  autoActiveFirstItem = true,
}: MegaMenuContentProps) => {
  const pathname = usePathname();
  const { data: listProducts, isLoading } = useGetListCategory({});
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);
  const mainMenuRef = useRef<HTMLDivElement>(null);
  const [menuHeight, setMenuHeight] = useState<number | null>(null);

  useEffect(() => {
    if (
      listProducts &&
      listProducts.length > 0 &&
      !activeItem &&
      autoActiveFirstItem
    ) {
      setActiveItem(listProducts[0]);
    }
  }, [listProducts, activeItem, autoActiveFirstItem]);

  useEffect(() => {
    if (mainMenuRef.current && activeItem) {
      const height = mainMenuRef.current.offsetHeight;
      setMenuHeight(height);
    }
  }, [activeItem, listProducts]);

  return (
    <>
      {/* Overlay blur layer home */}
      {activeItem && (
        <div
          className={cn(
            "fixed left-0 right-0 bottom-0 top-0 bg-black/30 pointer-events-none",
            pathname === "/" ? "z-[10]" : "z-[-1]",
            isMiniHeader && "z-[-1]"
          )}
        />
      )}
      <div
        style={{ height: menuHeight ? `${menuHeight}px` : "auto" }}
        className={cn(
          "min-w-[280px] z-20 p-0 bg-white shadow-md border border-gray-200",
          !isBanner && "absolute top-[calc(100%+16px)] left-0",
          isMiniHeader && "absolute top-[calc(100%+20px)] left-0",
          activeItem ? "h-fit rounded-tl-xl rounded-bl-xl" : "min-h-full rounded-xl",
          classNameContent
        )}
        onMouseEnter={onHover}
        onMouseLeave={() => {
          onClose();
          setActiveItem(null);
        }}
      >
        <div
          className={cn(
            "flex flex-col overflow-y-scroll h-full overflow-hidden",
            activeItem ? "rounded-l-xl" : "rounded-xl",
            isBanner && "max-h-[600px]"
            // isMiniHeader && "max-h-[80vh]"
          )}
        >
          {listProducts?.map((item: any, index: number) => (
            <React.Fragment key={item.id}>
              <div
                onMouseEnter={() => setActiveItem(item)}
                className={cn(
                  "h-[70px] cursor-pointer flex items-center gap-3 p-4 w-full text-left bg-white transition-all duration-200 hover:translate-x-1",
                  activeItem?.id === item.id
                    ? "border-l-4 border-l-brand-700 text-brand-700 bg-brand-50 font-semibold shadow-md"
                    : "border-l-4 border-l-white",
                  classNameSubItem
                )}
              >
                {/* {item.icon && item.icon} */}
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={200}
                  height={200}
                  className="size-[40px] object-cover rounded-sm aspect-square"
                />
                <span className="text-left">{item.name}</span>
                <ChevronRight className="ml-auto w-4 h-4" />
              </div>
              {index !== listProducts.length - 1 && (
                <hr className="border-t border-gray-200" />
              )}
            </React.Fragment>
          ))}
        </div>

        {activeItem && (
          <div
            ref={mainMenuRef}
            className={cn(
              "absolute left-full top-[-1px] bottom-0 xxl:min-w-[1000px] xl:min-w-[900px] min-w-[700px] w-fit h-fit bg-brand-50 p-6 rounded-r-xl flex flex-col ",
              isMiniHeader && "xxl:min-w-[800px] xl:min-w-[750px] min-w-[600px]"
            )}
          >
            <div className="">
              {activeItem.child && activeItem.child.length > 0 && (
                <div className="grid grid-cols-3 xxl:gap-4 xl:gap-2 gap-1 xxl:mb-2 mb-1 border-b border-[#919EAB] border-opacity-25 pb-4">
                  {activeItem.child.map((sub: any, index: number) => (
                    <Link
                      key={index}
                      href={`/${sub.slug}`}
                      onClick={onClose}
                      className="transition transform duration-200 text-[#1C252E] bg-white rounded-xl px-4 py-3 text-center flex xl:gap-x-4 gap-x-2 items-center justify-start cursor-pointer border border-transparent hover:border-brand-650 group"
                    >
                      <div>
                        <Image
                          src={sub.icon}
                          alt={`image-${index}`}
                          width={200}
                          height={200}
                          className="size-[70px] object-cover aspect-square rounded-lg"
                        />
                      </div>
                      <p className="font-semibold text-base group-hover:text-brand-650 transition-colors duration-200 text-left">
                        {sub.name}
                      </p>
                    </Link>
                  ))}
                </div>
              )}

              {activeItem.items && (
                <div className="mt-4 flex-1">
                  <div className="flex flex-col gap-1 h-full w-full">
                    <div className="flex flex-row justify-between items-center">
                      <h3 className="text-2xl font-bold mb-2 text-[#1C252E]">
                        Sản Phẩm Bán Chạy
                      </h3>
                      <Link
                        href={`/${activeItem.slug}`}
                        onClick={onClose}
                        className="cursor-pointer font-semibold text-brand-500 text-base transform transition duration-200 hover:scale-105"
                      >
                        Xem tất cả
                      </Link>
                    </div>
                    <div
                      className={cn(
                        "flex-1 grid grid-cols-6 2xl:grid-cols-5 gap-2",
                        isMiniHeader && "grid-cols-5"
                      )}
                    >
                      {activeItem.items
                        .slice(0, isMiniHeader ? 5 : 6)
                        .map((product: any, idx: number) => (
                          <ProductCard
                            isHome={true}
                            isBanner={true}
                            key={product.id}
                            product={product}
                          />
                        ))}
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
