import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem, CartSummary } from "@/types/cart";
import type { Product } from "@/types/product";
import { toast } from "sonner";
import { cartApi } from "@/api/cartApi";

interface CartState {
  cart: CartItem[];
  promoCode: string;
  discount: number;
  isLoading: boolean;
  error: string | null;

  // Actions
  addToCart: (productId: number | string, color?: string, quantity?: number) => void;
  removeFromCart: (productId: number | string) => void;
  updateQuantity: (productId: number | string, quantity: number) => void;
  clearCart: () => void;
  applyPromoCode: (code: string, products: Product[]) => Promise<boolean>;
  removePromoCode: () => void;
}

const FREE_SHIPPING_THRESHOLD = 1999;
const STANDARD_SHIPPING_FEE = 149;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      promoCode: "",
      discount: 0,
      isLoading: false,
      error: null,

      addToCart: (productId: number | string, color = "Black", quantity = 1) => {
        const { cart } = get();
        const existingIndex = cart.findIndex((item) => String(item.productId) === String(productId));

        let newCart: CartItem[];
        if (existingIndex > -1) {
          newCart = cart.map((item, index) =>
            index === existingIndex
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          newCart = [...cart, { productId, quantity, color }];
        }

        set({ cart: newCart });
        toast.success("Added to your bag");
      },

      removeFromCart: (productId: number | string) => {
        const { cart } = get();
        set({ cart: cart.filter((item) => String(item.productId) !== String(productId)) });
      },

      updateQuantity: (productId: number | string, quantity: number) => {
        if (quantity < 1) {
          get().removeFromCart(productId);
          return;
        }

        const { cart } = get();
        set({
          cart: cart.map((item) =>
            String(item.productId) === String(productId) ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => set({ cart: [], promoCode: "", discount: 0 }),

      applyPromoCode: async (code: string, products: Product[]) => {
        set({ isLoading: true, error: null });
        try {
          const subtotal = selectSubtotal(get().cart, products);
          const result = await cartApi.applyPromoCode(code, subtotal);
          set({
            promoCode: result.code,
            discount: result.discount,
            isLoading: false,
          });
          toast.success("Promo code applied!");
          return true;
        } catch (err: unknown) {
          const errorMessage = err instanceof Error ? err.message : "Invalid promo code";
          set({ error: errorMessage, isLoading: false });
          toast.error(errorMessage);
          return false;
        }
      },

      removePromoCode: () => set({ promoCode: "", discount: 0 }),
    }),
    {
      name: "morrow-cart-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ cart: state.cart, promoCode: state.promoCode, discount: state.discount }),
    }
  )
);

// --- Store Selectors (Pure Computed Helpers) ---

export const selectCartCount = (cart: CartItem[]): number => {
  return cart.reduce((total, item) => total + item.quantity, 0);
};

export const selectSubtotal = (cart: CartItem[], products: Product[]): number => {
  return cart.reduce((total, item) => {
    const product = products.find((p) => String(p.id) === String(item.productId));
    return total + (product?.price ?? 0) * item.quantity;
  }, 0);
};

export const selectCartSummary = (
  cart: CartItem[],
  products: Product[],
  discount = 0
): CartSummary => {
  const subtotal = selectSubtotal(cart, products);
  const hasFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shipping = cart.length === 0 ? 0 : hasFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
  const amountAwayFromFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const total = Math.max(0, subtotal + shipping - discount);

  return {
    subtotal,
    shipping,
    discount,
    total,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    amountAwayFromFreeShipping,
    hasFreeShipping,
  };
};
