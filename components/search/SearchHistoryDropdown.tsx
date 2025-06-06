import Image from "next/image";
import Link from "next/link";
import IconSearchHeader from "../icon/IconSearchHeader";
import { convertToSlug } from "@/utils/format/ConvertToSlug";

interface ProductItem {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  url: string;
}

interface SearchHistoryDropdownProps {
  filterCategories?: {
    name: string;
    slug: string;
  }[];
  searchResults?: ProductItem[];
  onSelect?: (value: string) => void;
  isOpen: boolean;
  onClose: () => void;
  isLoading?: boolean;
  searchQuery?: string;
}

const SearchHistoryDropdown = ({
  filterCategories = [],
  searchResults = [],
  onSelect,
  isOpen,
  onClose,
  isLoading = false,
  searchQuery = "",
}: SearchHistoryDropdownProps) => {
  const hasSearchResults = searchResults.length > 0;

  const noResults =
    !isLoading && !hasSearchResults && searchQuery.trim().length > 0;

  // Hàm để làm nổi bật từ khóa tìm kiếm trong văn bản
  const highlightSearchQuery = (text: string, query: string) => {
    if (!query.trim()) return text;

    const regex = new RegExp(`(${query.trim()})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
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
      className={`absolute left-0 top-[calc(100%+10px)] w-full bg-white rounded-xl shadow-lg z-50 border border-gray-200 transition-all duration-300 ease-in-out ${
        isOpen 
        ? "opacity-100 visible translate-y-0" 
        : "opacity-0 invisible -translate-y-8"
      }`}
    >
      <div className="w-full max-h-[400px] overflow-auto p-4 flex flex-col gap-6">
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
            <div className="flex flex-col">
              {searchResults.slice(0, 5).map((product: any, index) => (
                <div
                  key={`suggestion-${product.id}-${index}`}
                  className="flex gap-2 items-center cursor-pointer hover:bg-gray-100 transition-colors rounded-lg p-2 px-3"
                  onClick={() => onSelect && onSelect(product.name)}
                >
                  <IconSearchHeader
                    fill="#1C252E"
                    className="size-4 flex-shrink-0"
                  />
                  <p className="text-sm text-primary-new line-clamp-1 font-medium">
                    {highlightSearchQuery(product.name, searchQuery)}
                  </p>
                </div>
              ))}
            </div>

            {/* Phần sản phẩm */}
            <div className="flex flex-col">
              <h3 className="text-base font-bold text-primary-new capitalize px-3 mb-2">
                Sản phẩm
              </h3>
              {searchResults?.map((product: any) => (
                <Link
                  key={product.id}
                  href={`/${product.slug_category}/${convertToSlug(product?.name)}-${product.id}`}
                  onClick={onClose}
                  className="flex gap-3 p-2 cursor-pointer hover:bg-gray-100 transition-colors w-full rounded-lg"
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

        {!hasSearchResults && !isLoading && filterCategories.length > 0 && (
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-bold text-primary-new capitalize">
              Tìm kiếm phổ biến
            </h3>
            <div className="flex flex-wrap gap-2">
              {filterCategories.map((category: any, index: number) => (
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
  );
};

export default SearchHistoryDropdown;
