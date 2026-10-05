import { create } from "zustand";

interface UiState {
  cartDrawerOpen: boolean;
  searchModalOpen: boolean;
  mobileMenuOpen: boolean;
  searchQuery: string;

  // Actions
  setCartDrawerOpen: (open: boolean) => void;
  toggleCartDrawer: () => void;
  setSearchModalOpen: (open: boolean) => void;
  toggleSearchModal: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  cartDrawerOpen: false,
  searchModalOpen: false,
  mobileMenuOpen: false,
  searchQuery: "",

  setCartDrawerOpen: (open) => set({ cartDrawerOpen: open }),
  toggleCartDrawer: () => set((state) => ({ cartDrawerOpen: !state.cartDrawerOpen })),

  setSearchModalOpen: (open) => set({ searchModalOpen: open }),
  toggleSearchModal: () => set((state) => ({ searchModalOpen: !state.searchModalOpen })),

  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),

  setSearchQuery: (searchQuery) => set({ searchQuery }),
  clearSearch: () => set({ searchQuery: "" }),
}));
