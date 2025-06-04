import { CartItem, ICartStore } from "@/types/cart/ICart";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create<ICartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      isCartOpen: false,

      addToCart: (product) => set((state) => {
        const existingItem = state.items.find(item => item.id === product.id);
        
        if (existingItem) {
          // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng
          const updatedItems = state.items.map(item => 
            item.id === product.id 
              ? { ...item, quantity: item.quantity + 1 } 
              : item
          );
          
          const newTotalItems = state.totalItems + 1;
          const newTotalPrice = state.totalPrice + Number(product.price_promotion || product.price);
          
          return { 
            items: updatedItems, 
            totalItems: newTotalItems,
            totalPrice: newTotalPrice,
            isCartOpen: true
          };
        } else {
          // Xử lý images: nếu là mảng thì lấy phần tử đầu tiên
          const productImage = Array.isArray(product.images) 
            ? product.images[0] 
            : product.images;
            
          // Nếu là sản phẩm mới, thêm vào giỏ hàng
          const newItem: CartItem = {
            id: product.id,
            name: product.name,
            price: Number(product.price || 0),
            price_promotion: Number(product.price_promotion || 0),
            images: productImage,
            quantity: 1,
            slug_category: product.slug_category,
            slug: product.slug
          };
          
          const newTotalItems = state.totalItems + 1;
          const newTotalPrice = state.totalPrice + Number(product.price_promotion || product.price);
          
          return { 
            items: [...state.items, newItem], 
            totalItems: newTotalItems,
            totalPrice: newTotalPrice,
            isCartOpen: true
          };
        }
      }),
      
      removeFromCart: (productId) => set((state) => {
        const itemToRemove = state.items.find(item => item.id === productId);
        if (!itemToRemove) return state;
        
        const newItems = state.items.filter(item => item.id !== productId);
        const newTotalItems = state.totalItems - itemToRemove.quantity;
        const itemTotalPrice = itemToRemove.quantity * (itemToRemove.price_promotion || itemToRemove.price);
        const newTotalPrice = state.totalPrice - itemTotalPrice;
        
        return { 
          items: newItems, 
          totalItems: newTotalItems,
          totalPrice: newTotalPrice
        };
      }),
      
      updateQuantity: (productId, quantity) => set((state) => {
        const itemToUpdate = state.items.find(item => item.id === productId);
        if (!itemToUpdate) return state;
        
        const quantityDiff = quantity - itemToUpdate.quantity;
        const updatedItems = state.items.map(item => 
          item.id === productId ? { ...item, quantity } : item
        );
        
        const newTotalItems = state.totalItems + quantityDiff;
        const itemPrice = itemToUpdate.price_promotion || itemToUpdate.price;
        const newTotalPrice = state.totalPrice + (quantityDiff * itemPrice);
        
        return { 
          items: updatedItems, 
          totalItems: newTotalItems,
          totalPrice: newTotalPrice
        };
      }),
      
      clearCart: () => set({ 
        items: [], 
        totalItems: 0,
        totalPrice: 0
      }),
      
      toggleCart: () => set((state) => ({ 
        isCartOpen: !state.isCartOpen 
      })),
      
      closeCart: () => set({ isCartOpen: false }),
      
      openCart: () => set({ isCartOpen: true })
    }),
    {
      name: "cart-storage", // tên của key trong localStorage
    }
  )
); 