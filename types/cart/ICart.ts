export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  price_promotion: number;
  images: string;
  quantity: number;
  slug_category?: string;
  slug?: string;
  price_discount?: number;
  item_id?: string;
}

export interface ICartStore {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  isLoading: boolean;
  shouldRedirectToCart: boolean;
  
  // UI methods
  toggleCart: () => void;
  closeCart: () => void;
  openCart: () => void;
  resetRedirect: () => void;
  
  // API methods
  fetchCart: () => Promise<CartItem[]>;
  addToCartAPI: (productId: string | number, quantity?: number) => Promise<boolean>;
  addToCartBuyNow: (productId: string | number, quantity?: number) => Promise<boolean>;
  updateQuantityAPI: (productId: string | number, quantity: number) => Promise<boolean>;
  removeFromCartAPI: (productId: string | number) => Promise<boolean>;
} 