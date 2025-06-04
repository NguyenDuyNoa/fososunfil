import IconShopping from "@/components/icon/IconShopping";
import CloseIcon from "@/components/icons/CloseIcon";
import { IMAGES } from "@/constants/Images";
import { useCartStore } from "@/stores/useCartStore";
import { CartItem } from "@/types/cart/ICart";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback, memo, useMemo, useRef } from "react";
import { usePathname } from "next/navigation";

interface CartItemProps {
  item: CartItem;
  onRemove: (id: string | number) => void;
  formatPrice: (price: number) => string;
}

// Tách CartItem thành component riêng để tránh re-render toàn bộ danh sách
const CartItemComponent = memo(({ item, onRemove, formatPrice }: CartItemProps) => {
  const handleRemoveItem = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(item.id);
  };

  // Đảm bảo images luôn là string
  const imageUrl = Array.isArray(item.images) ? item.images[0] : item.images;

  return (
    <div className="flex gap-4 py-1">
      <Image
        src={imageUrl}
        alt={item.name}
        width={64}
        height={64}
        className="object-cover w-16 h-16 rounded-xl"
      />
      <div className="flex flex-col gap-1 flex-1">
        <p className="text-sm font-semibold text-primary-new line-clamp-2">
          {item.name}
        </p>

        <div className="flex gap-2 justify-between items-center">
          <span className="text-sm font-normal text-primary-new">x{item.quantity}</span>
          <div className="flex items-center gap-2">
            {item.price > item.price_promotion && item.price_promotion > 0 && (
              <p className="text-xs font-normal text-disable-50 line-through">
                {formatPrice(item.price)} <span className="underline">đ</span>
              </p>
            )}
            <p className="text-base font-normal text-error-dark">
              {formatPrice(item.price_promotion || item.price)} <span className="underline">đ</span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex-shrink-0">
        <button
          className="bg-grey-200 rounded p-1 hover:bg-gray-200 transition-all duration-300 group"
          onClick={handleRemoveItem}
        >
          <CloseIcon className="size-4 text-primary-new group-hover:text-red-400 transition-all duration-300" />
        </button>
      </div>
    </div>
  );
});

CartItemComponent.displayName = "CartItemComponent";

// Tách CartItems thành component riêng để tránh render lại khi thêm sản phẩm
const CartItems = memo(({ 
  items, 
  onRemoveItem, 
  formatPrice 
}: {
  items: CartItem[];
  onRemoveItem: (id: string | number) => void;
  formatPrice: (price: number) => string;
}) => {
  if (items.length === 0) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center py-4">
        <Image
          src={IMAGES.cartEmpty}
          alt="Giỏ hàng trống"
          width={200}
          height={200}
        />
        <p className="text-sm text-secondary-new">Giỏ hàng của bạn đang trống</p>
      </div>
    );
  }
  
  return (
    <>
      {items.map((item) => (
        <CartItemComponent 
          key={`${item.id}-${item.quantity}`}
          item={item} 
          onRemove={onRemoveItem} 
          formatPrice={formatPrice}
        />
      ))}
    </>
  );
}, (prevProps, nextProps) => {
  // Chỉ render lại nếu số lượng items thay đổi hoặc có sự thay đổi về ID của items
  if (prevProps.items.length !== nextProps.items.length) {
    return false; // Render lại
  }
  
  // So sánh từng item để xem có thay đổi không
  const prevIds = prevProps.items.map(item => `${item.id}-${item.quantity}`).sort();
  const nextIds = nextProps.items.map(item => `${item.id}-${item.quantity}`).sort();
  
  // So sánh chuỗi JSON để kiểm tra nhanh hơn
  return JSON.stringify(prevIds) === JSON.stringify(nextIds);
});

CartItems.displayName = "CartItems";

// Tách dropdown thành component riêng để tránh render lại khi thêm sản phẩm
const CartDropdown = memo(({ 
  isVisible, 
  items, 
  totalItems, 
  totalPrice, 
  onClose, 
  onRemoveItem, 
  formatPrice 
}: {
  isVisible: boolean;
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  onClose: () => void;
  onRemoveItem: (id: string | number) => void;
  formatPrice: (price: number) => string;
}) => {
  // Sử dụng ref để tránh re-render không cần thiết
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
    }
  }, [isVisible]);
  
  if (!isVisible) return null;
  
  return (
    <div 
      ref={dropdownRef}
      className={`absolute top-[calc(100%+14px)] right-0 w-[400px] max-h-[70vh] z-20 border border-gray-200 py-5 px-4 bg-white rounded-xl flex flex-col gap-4 cart-dropdown transform transition-all duration-300 ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
    >
      {/* Arrow pointing to cart */}
      <div className="absolute -top-[9px] right-5 w-4 h-4 bg-white transform rotate-45 border-t border-l border-gray-200"></div>
      
      <div className="flex items-center gap-2 justify-between">
        <h3 className="text-lg font-semibold whitespace-nowrap text-primary-new">
          Giỏ hàng
        </h3>
        <span className="text-sm font-normal text-secondary-new">
          {totalItems} sản phẩm
        </span>
      </div>
      <hr className="border-[#919EAB3D]" />
      
      <div className="flex flex-col gap-3 overflow-y-auto max-h-[250px] cart-items-container">
        <CartItems 
          items={items}
          onRemoveItem={onRemoveItem}
          formatPrice={formatPrice}
        />
      </div>
      
      {items.length > 0 && (
        <>
          <hr className="border-[#919EAB3D] border-dashed" />
          <div className="flex items-center gap-2 justify-between">
            <p className="text-xl font-semibold whitespace-nowrap text-primary-new">
              Tổng cộng
            </p>
            <span className="text-xl font-semibold text-error-dark">
              {formatPrice(totalPrice)} <span className="underline">đ</span>
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <Link 
              href="/cart"
              className="text-center text-base font-bold text-white bg-brand-500 hover:bg-brand-400 transition-all duration-300 rounded-lg py-3 px-4"
              onClick={onClose}
            >
              Đặt hàng ngay
            </Link>
            <button 
              className="bg-white hover:bg-brand-50 text-brand-500 border border-transparent hover:border-brand-500 rounded-lg py-3 px-4 transition-all duration-300"
              onClick={onClose}
            >
              Tiếp tục mua hàng
            </button>
          </div>
        </>
      )}
    </div>
  );
}, (prevProps, nextProps) => {
  // Chỉ render lại khi trạng thái hiển thị thay đổi hoặc tổng số lượng/giá thay đổi
  if (prevProps.isVisible !== nextProps.isVisible) {
    return false; // Render lại
  }
  
  // Nếu dropdown đang hiển thị, chỉ render lại khi totalItems hoặc totalPrice thay đổi
  if (prevProps.isVisible && nextProps.isVisible) {
    return (
      prevProps.totalItems === nextProps.totalItems &&
      prevProps.totalPrice === nextProps.totalPrice
    );
  }
  
  return true; // Không render lại trong các trường hợp khác
});

CartDropdown.displayName = "CartDropdown";

const Cart = () => {
  const { items, totalItems, totalPrice, isCartOpen, removeFromCart, toggleCart, closeCart } = useCartStore();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const pathname = usePathname();
  const isCartPage = pathname === "/cart";
  
  // Memoize các props để tránh re-render không cần thiết
  const memoizedItems = useMemo(() => items, [items]);
  const memoizedTotalItems = useMemo(() => totalItems, [totalItems]);
  const memoizedTotalPrice = useMemo(() => totalPrice, [totalPrice]);
  const memoizedFormatPrice = useCallback((price: number) => {
    return price.toLocaleString();
  }, []);
  
  // Theo dõi thay đổi isCartOpen từ store
  useEffect(() => {
    if (isCartOpen && !isCartPage) {
      setIsDropdownVisible(true);
    }
  }, [isCartOpen, isCartPage]);
  
  // Xử lý đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.cart-dropdown') && isDropdownVisible) {
        setIsDropdownVisible(false);
        closeCart(); // Đồng bộ trạng thái với store
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownVisible, closeCart]);

  const handleMouseEnter = useCallback(() => {
    if (isCartPage) return; // Không hiển thị dropdown nếu đang ở trang cart
    
    setIsDropdownVisible(true);
    if (!isCartOpen) {
      toggleCart(); // Đồng bộ trạng thái với store
    }
  }, [isCartOpen, toggleCart, isCartPage]);

  const handleMouseLeave = useCallback(() => {
    setIsDropdownVisible(false);
    if (isCartOpen) {
      closeCart(); // Đồng bộ trạng thái với store
    }
  }, [isCartOpen, closeCart]);

  const handleRemoveItem = useCallback((id: string | number) => {
    removeFromCart(id);
  }, [removeFromCart]);

  const handleCloseDropdown = useCallback(() => {
    setIsDropdownVisible(false);
    closeCart();
  }, [closeCart]);

  return (
    <div 
      className="relative cart-dropdown"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href="/cart"
        className="hidden xl:flex items-center gap-2 cursor-pointer relative hover:bg-brand-50 rounded-full py-1 px-2"
      >
        <IconShopping fill="#0154C5" className="size-9" />
        <span className="text-sm font-medium whitespace-nowrap text-primary-new">
          Giỏ hàng
        </span>
        <div className="absolute -top-3 left-[22px] bg-error-main rounded-full size-6 flex items-center justify-center">
          <span className="text-white text-xs font-medium mt-0.5">{memoizedTotalItems}</span>
        </div>
      </Link>
      <Link
        href="/cart"
        className="xl:hidden flex items-center gap-2 cursor-pointer relative bg-[#0154C5] p-2 rounded-full"
      >
        <IconShopping fill="white" className="size-5" />
        <div className="absolute top-0 right-0 bg-error-main rounded-full size-4 flex items-center justify-center">
          <span className="text-white text-[10px]/[16px] font-medium mt-0.5">
            {memoizedTotalItems}
          </span>
        </div>
      </Link>
      
      {/* Đoạn đệm để ngăn dropdown bị đóng khi di chuột từ giỏ hàng xuống dropdown */}
      {isDropdownVisible && (
        <div className="absolute top-full left-0 right-0 h-5 z-20"></div>
      )}
      
      <CartDropdown 
        isVisible={isDropdownVisible}
        items={memoizedItems}
        totalItems={memoizedTotalItems}
        totalPrice={memoizedTotalPrice}
        onClose={handleCloseDropdown}
        onRemoveItem={handleRemoveItem}
        formatPrice={memoizedFormatPrice}
      />
    </div>
  );
};

export default Cart;
