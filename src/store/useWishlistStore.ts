import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "sonner";

interface WishlistState {
  wishlist: number[];

  // Actions
  toggleWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlist: [],

      toggleWishlist: (productId: number) => {
        const { wishlist } = get();
        const exists = wishlist.includes(productId);

        if (exists) {
          set({ wishlist: wishlist.filter((id) => id !== productId) });
          toast("Removed from wishlist");
        } else {
          set({ wishlist: [...wishlist, productId] });
          toast.success("Saved to wishlist");
        }
      },

      isInWishlist: (productId: number) => {
        return get().wishlist.includes(productId);
      },

      clearWishlist: () => set({ wishlist: [] }),
    }),
    {
      name: "morrow-wishlist-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
