import { useAuthStore } from "@/stores/useAuthStores";
import { useCartStore } from "@/stores/useCartStore";
import { useDialogStore } from "@/stores/useDialogStore";
import { convertToSlug } from "@/utils/format/ConvertToSlug";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import MinusIcon from "../icons/MinusIcon";
import PlusIcon from "../icons/PlusIcon";

// Hàm loại bỏ dấu tiếng Việt
const removeAccents = (str: string): string => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};

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
  const { informationUser } = useAuthStore();
  const { handleOpenDialog } = useDialogStore();
  const { items, addToCartBuyNow, updateQuantityAPI } = useCartStore();
  const pathname = usePathname();
  const hasSearchResults = searchResults?.length > 0;

  // Hàm kiểm tra sản phẩm có trong giỏ hàng không và lấy số lượng
  const getProductFromCart = (productId: string) => {
    return items.find((item) => item?.item_id === productId);
  };

  const isProductInCart = (productId: string) => {
    return !!getProductFromCart(productId);
  };

  // Hàm tăng số lượng
  const increaseQuantity = (e: React.MouseEvent, productId: string) => {
    e.preventDefault();
    e.stopPropagation();
    const cartItem = getProductFromCart(productId);
    if (cartItem) {
      updateQuantityAPI(cartItem.id, Number(cartItem.quantity) + 1);
    }
  };

  // Hàm giảm số lượng
  const decreaseQuantity = (e: React.MouseEvent, productId: string) => {
    e.preventDefault();
    e.stopPropagation();
    const cartItem = getProductFromCart(productId);
    if (cartItem && cartItem.quantity > 1) {
      updateQuantityAPI(cartItem.id, cartItem.quantity - 1);
    }
  };

  // Hàm xử lý thay đổi số lượng
  const handleQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    productId: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const cartItem = getProductFromCart(productId);
    if (!cartItem) return;

    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      updateQuantityAPI(cartItem.id, value);
    } else if (e.target.value === "") {
      updateQuantityAPI(cartItem.id, 1);
    }
  };

  // Hàm xử lý focus input
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.select();
  };

  const noResults =
    !isLoading && !hasSearchResults && searchQuery.trim()?.length > 0;

  // Hàm để làm nổi bật từ khóa tìm kiếm trong văn bản
  const highlightSearchQuery = (
    text: string,
    query: string,
    color: string = "text-brand-700"
  ) => {
    if (!query.trim()) return text;

    const normalizedText = removeAccents(text.toLowerCase());
    const normalizedQuery = removeAccents(query.toLowerCase().trim());

    // Tạo regex với từ khóa đã được chuẩn hóa
    const regex = new RegExp(`(${normalizedQuery})`, "gi");

    // Tìm tất cả các vị trí match trong text đã chuẩn hóa
    const matches = Array.from(normalizedText.matchAll(regex));

    if (matches.length === 0) return text;

    // Tạo mảng chứa các phần của text gốc
    const result = [];
    let lastIndex = 0;

    matches.forEach((match) => {
      const startIndex = match.index!;
      const matchLength = match[0].length;

      // Thêm phần text trước match
      if (startIndex > lastIndex) {
        result.push(text.slice(lastIndex, startIndex));
      }

      // Thêm phần text match với highlight
      result.push(
        <span key={startIndex} className={`${color} font-semibold`}>
          {text.slice(startIndex, startIndex + matchLength)}
        </span>
      );

      lastIndex = startIndex + matchLength;
    });

    // Thêm phần text còn lại
    if (lastIndex < text.length) {
      result.push(text.slice(lastIndex));
    }

    return result;
  };

  const handleBuyNow = async (e: React.MouseEvent, productId: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!informationUser) {
      handleOpenDialog("login", "desktop");
      return;
    }

    // Chỉ đóng dropdown khi không ở trang giỏ hàng
    if (pathname !== "/cart") {
      onClose();
    }

    await addToCartBuyNow(productId, 1);
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
          <div className="flex flex-col gap-1 -mt-4">
            <h3 className="text-base font-bold text-primary-new capitalize px-3 pt-3 pb-2 border-b border-gray-100 sticky -top-4 bg-white z-10">
              Sản phẩm
            </h3>
            {searchResults?.map((product: any) => (
              <div key={product.id} className="relative">
                <Link
                  href={`/${product.slug_category}/${convertToSlug(product?.name)}-${product.id}`}
                  onClick={onClose}
                  className="flex gap-3 p-2 cursor-pointer hover:bg-gray-100 transition-colors w-full rounded-lg group"
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
                  <div className="flex-1 min-w-0 flex flex-col gap-1">
                    <p className="text-sm text-[#36443F] font-medium line-clamp-2">
                      {highlightSearchQuery(product.name, searchQuery, "text-brand-500")}
                    </p>
                    {product?.dtKeyWord?.length > 0 && (
                      <div className="flex items-center gap-2">
                        {product?.dtKeyWord?.map((item: string, index: number) => (
                          <span key={index} className="text-xs text-primary-new">
                            #{highlightSearchQuery(item, searchQuery, "text-brand-500")}
                          </span>
                        ))}
                      </div>
                    )}
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
                        {product.price_promotion && product.price_promotion < product.price && (
                          <div className="flex items-center gap-0.5 text-xs text-disable-50">
                            <p className="line-through">
                              {Number(product.price_promotion).toLocaleString()}
                            </p>
                            <span className="underline">đ</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </Link>

                {!isProductInCart(product.id) ? (
                  <button
                    className="absolute bottom-2 right-2 bg-brand-500 rounded-lg py-1 px-2 text-white text-sm font-semibold hover:bg-brand-400 transition-colors duration-300"
                    onClick={(e) => handleBuyNow(e, product.id)}
                    disabled={isLoading}
                  >
                    Đặt hàng
                  </button>
                ) : (
                  <div className="absolute bottom-2 right-2">
                    <div className="bg-white h-[34px] w-fit p-1 flex items-center border border-[#919EAB33] rounded-full">
                      <button
                        className="p-1 group rounded-full hover:bg-gray-100 transition-all duration-300"
                        onClick={(e) => decreaseQuantity(e, product.id)}
                      >
                        <MinusIcon className="size-4" />
                      </button>
                      <input
                        type="text"
                        className="w-10 text-center text-sm font-semibold text-primary-new focus:outline-none bg-transparent"
                        value={getProductFromCart(product.id)?.quantity || 1}
                        onChange={(e) => handleQuantityChange(e, product.id)}
                        onFocus={handleFocus}
                      />
                      <button
                        className="p-1 group rounded-full hover:bg-gray-100 transition-all duration-300"
                        onClick={(e) => increaseQuantity(e, product.id)}
                      >
                        <PlusIcon className="size-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
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
