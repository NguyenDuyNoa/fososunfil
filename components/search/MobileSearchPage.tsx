import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import IconSearchHeader from "../icon/IconSearchHeader";
import IconCameraHeader from "../icon/IconCameraHeader";
import { useGetSearchHistory } from "@/managers/api-management/search/useGetSearchHistory";
import { useDebounce } from "use-debounce";
import ArrowRightIcon from "../icons/ArrowRightIcon";

interface MobileSearchPageProps {
  isOpen: boolean;
  filterCategories: {
    name: string;
    slug: string;
  }[];
  onClose: () => void;
}

const MobileSearchPage: React.FC<MobileSearchPageProps> = ({
  isOpen,
  filterCategories = [],
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
  const router = useRouter();
  const { data: searchResults = [], isLoading } = useGetSearchHistory(debouncedSearchQuery);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };
    
  // Kiểm tra có kết quả tìm kiếm hay không
  const hasSearchResults = searchResults.length > 0;
  
  // Kiểm tra không có kết quả tìm kiếm
  const noResults = !isLoading && !hasSearchResults && searchQuery.trim().length > 0;
  
  // Hàm để làm nổi bật từ khóa tìm kiếm trong văn bản
  const highlightSearchQuery = (text: string, query: string) => {
    if (!query.trim()) return text;

    const regex = new RegExp(`(${query.trim()})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index: number) =>
      regex.test(part) ? (
        <span key={index} className="text-brand-700 font-semibold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div 
      className={`fixed inset-0 z-[60] bg-[#F4F7FA] overflow-auto transition-all duration-300 ease-in-out ${
        isOpen 
          ? "opacity-100 transform translate-x-0" 
          : "opacity-0 transform translate-x-full pointer-events-none"
      }`}
    >
      {/* Header tìm kiếm */}
      <div className="flex items-center gap-3 px-3 py-2 bg-white">
        <button onClick={onClose}>
         <ArrowRightIcon className="size-6 rotate-180"/>
        </button>
        <form className="flex flex-row items-center w-full border-[1.5px] border-brand-500 rounded-full p-1 pl-5 bg-white">
          <input
            type="text"
            placeholder="Tìm sản phẩm"
            className="flex-1 bg-transparent pt-0.5 text-primary-new border-none outline-none placeholder:text-disable-50 text-sm/[24px] font-normal"
            value={searchQuery}
            onChange={handleSearchChange}
            autoFocus
          />
          {searchQuery && (
            <button 
              type="button" 
              onClick={handleClearSearch}
              className="flex items-center justify-center mr-2"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L4 12" stroke="#637381" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 4L12 12" stroke="#637381" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
          <button type="button" className="mr-2">
            <IconCameraHeader fill="#041F2F" className="size-6" />
          </button>
          <button type="submit" className="bg-brand-500 rounded-full py-2 px-3">
            <IconSearchHeader fill="white" className="size-4" />
          </button>
        </form>
      </div>

      {/* Nội dung tìm kiếm */}
      <div className="p-3">
        <div className=" w-full">
          <div className="w-full max-h-[calc(100vh-96px)] overflow-auto flex flex-col gap-6">
            {/* Hiển thị loading */}
            {isLoading && (
              <div className="flex flex-col gap-2 items-center justify-center">
                <div className="animate-pulse flex w-full gap-2">
                  <div className="size-20 rounded-lg bg-gray-200 flex-shrink-0" />
                  <div className="flex flex-col gap-2 w-full">
                    <div className="w-full h-8 rounded-lg bg-gray-200" />
                    <div className="w-[20%] h-6 rounded-lg bg-gray-200" />
                  </div>
                </div>
                <div className="animate-pulse flex w-full gap-2">
                  <div className="size-20 rounded-lg bg-gray-200 flex-shrink-0" />
                  <div className="flex flex-col gap-2 w-full">
                    <div className="w-full h-8 rounded-lg bg-gray-200" />
                    <div className="w-[20%] h-6 rounded-lg bg-gray-200" />
                  </div>
                </div>
              </div>
            )}

            {/* Hiển thị không có kết quả */}
            {noResults && searchQuery && (
              <div className="flex flex-col items-center justify-center py-1">
                <p className="text-lg font-normal text-primary-new">
                  Không có kết quả tìm kiếm cho <br />
                </p>
                <span className="text-lg font-semibold">"{searchQuery}"</span>
              </div>
            )}

            {/* Hiển thị kết quả sản phẩm */}
            {hasSearchResults && (
              <div className="flex flex-col gap-6">
                {/* Phần gợi ý tìm kiếm */}
                <div className="flex flex-col gap-4">
                  {searchResults.slice(0, 5).map((product: any, index: number) => (
                    <div
                      key={`suggestion-${product.id}-${index}`}
                      className="flex gap-2 items-center"
                      onClick={() => handleSelectSearch(product.name)}
                    >
                      <IconSearchHeader
                        fill="#1C252E"
                        className="size-4 flex-shrink-0"
                      />
                      <p className="text-sm text-primary-new line-clamp-1">
                        {highlightSearchQuery(product.name, searchQuery)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Phần sản phẩm */}
                <div className="flex flex-col gap-3">
                  {searchResults?.map((product: any) => (
                    <Link
                      key={product.id}
                      href={`/${product.slug_category}/${product.id}`}
                      onClick={onClose}
                      className="flex gap-3 p-2 cursor-pointer bg-white transition-colors w-full rounded-lg"
                    >
                      <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={product.images}
                          alt={product.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col gap-2">
                        <p className="text-sm text-[#36443F] font-medium line-clamp-2">
                          {product.name}
                        </p>
                        {product.price_promotion == 0 ? (
                          <span className="text-base text-error-dark font-semibold">
                            Liên hệ
                          </span>
                        ) : (
                          <div className="flex items-center gap-2">
                            <p className="text-base font-semibold text-error-dark">
                              {Number(product.price).toLocaleString()}{" "}
                              <span className="underline">đ</span>
                            </p>
                            {product.price_promotion &&
                              product.price_promotion < product.price && (
                                <div className="flex items-center gap-0.5 text-xs text-disable-50">
                                  <p className="line-through">
                                    {Number(
                                      product.price_promotion
                                    ).toLocaleString()}
                                  </p>
                                  <span className="underline">đ</span>
                                </div>
                              )}
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Tìm kiếm phổ biến chỉ hiển thị khi không có từ khóa tìm kiếm */}
            {!hasSearchResults && !isLoading && filterCategories.length > 0 && !searchQuery && (
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-bold text-primary-new capitalize">
                  Tìm kiếm phổ biến
                </h3>
                <div className="flex flex-wrap gap-2">
                  {filterCategories.map((category, index: number) => (
                    <Link
                      key={index}
                      href={`/${category.slug}`}
                      onClick={onClose}
                      className="cursor-pointer rounded-full border border-[#919EAB3D] hover:border-primary-new/50 hover:bg-gray-50 transition-colors text-base font-normal text-primary-new px-4 py-2"
                    >
                      {category?.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSearchPage; 