export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  price_promotion: number;
  images: string;
  quantity: number;
  slug_category?: string;
  slug?: string;
}

export interface ICartStore {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  
  // Methods
  addToCart: (product: any) => void;
  removeFromCart: (productId: string | number) => void;
  updateQuantity: (productId: string | number, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  closeCart: () => void;
  openCart: () => void;
} 