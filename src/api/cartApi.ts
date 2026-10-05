import type { CartItem } from "@/types/cart";

export const cartApi = {
  async syncCart(_cart: CartItem[]): Promise<{ success: boolean }> {
    // API contract placeholder for backend cart synchronization
    return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 100));
  },

  async applyPromoCode(code: string, subtotal: number): Promise<{ discount: number; code: string }> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (code.trim().toUpperCase() === "MORROW10") {
          resolve({ discount: subtotal * 0.1, code: "MORROW10" });
        } else {
          reject(new Error("Invalid promotional code"));
        }
      }, 200);
    });
  },
};
