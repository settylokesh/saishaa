import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product } from '@/types';

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
  cartAnimationTrigger: number;

  // Actions
  addItem: (product: Product, quantity?: number, options?: Record<string, string>) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleDrawer: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  triggerCartAnimation: () => void;

  // Computed
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItemById: (productId: string) => CartItem | undefined;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,
      cartAnimationTrigger: 0,

      addItem: (product, quantity = 1, options) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          return {
            items: [...state.items, { product, quantity, selectedOptions: options }],
          };
        });

        // Trigger cart animation instead of opening drawer
        get().triggerCartAnimation();
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      toggleDrawer: () => {
        set((state) => ({ isDrawerOpen: !state.isDrawerOpen }));
      },

      openDrawer: () => {
        set({ isDrawerOpen: true });
      },

      closeDrawer: () => {
        set({ isDrawerOpen: false });
      },

      triggerCartAnimation: () => {
        set((state) => ({ cartAnimationTrigger: state.cartAnimationTrigger + 1 }));
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },

      getItemById: (productId) => {
        return get().items.find((item) => item.product.id === productId);
      },
    }),
    {
      name: 'saishaa-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
