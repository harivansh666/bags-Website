import { create } from "zustand";
import type { Product, Collection, Category, SortOption } from "@/types/product";
import { productsApi, MOCK_PRODUCTS, MOCK_COLLECTIONS } from "@/api/productsApi";

interface ProductState {
  products: Product[];
  currentProduct: Product | null;
  collections: Collection[];
  isLoading: boolean;
  error: string | null;

  // Filter & Sorting State
  selectedCategory: Category | null;
  sortBy: SortOption;
  inStockOnly: boolean;

  // Actions
  fetchProducts: () => Promise<void>;
  fetchProductById: (id: number) => Promise<void>;
  fetchCollections: () => Promise<void>;
  setCategory: (category: Category | null) => void;
  setSortBy: (sort: SortOption) => void;
  setInStockOnly: (inStock: boolean) => void;
  resetFilters: () => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: MOCK_PRODUCTS,
  currentProduct: null,
  collections: MOCK_COLLECTIONS,
  isLoading: false,
  error: null,

  selectedCategory: null,
  sortBy: "featured",
  inStockOnly: false,

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const products = await productsApi.getProducts();
      set({ products, isLoading: false });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load products";
      set({ error: errorMessage, isLoading: false });
    }
  },

  fetchCollections: async () => {
    try {
      const collections = await productsApi.getCollections();
      set({ collections });
    } catch {
      // Keep default mock collections fallback
    }
  },

  setCategory: (category) => set({ selectedCategory: category }),
  setSortBy: (sortBy) => set({ sortBy }),
  setInStockOnly: (inStockOnly) => set({ inStockOnly }),
  resetFilters: () => set({ selectedCategory: null, sortBy: "featured", inStockOnly: false }),

  fetchProductById: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      await productsApi.getProductById(id);
      set({ isLoading: false });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load product";
      set({ error: errorMessage, isLoading: false });
    }
  },
}));

// --- Pure Selectors ---

export const selectFilteredProducts = (state: ProductState): Product[] => {
  let list = [...state.products];

  if (state.selectedCategory) {
    list = list.filter((p) => p.category === state.selectedCategory);
  }

  if (state.inStockOnly) {
    list = list.filter((p) => p.stock > 0);
  }

  switch (state.sortBy) {
    case "low":
      list.sort((a, b) => a.price - b.price);
      break;
    case "high":
      list.sort((a, b) => b.price - a.price);
      break;
    case "new":
      list.sort((a, b) => b.id - a.id);
      break;
    case "featured":
    default:
      list.sort((a, b) => Number(b.isBestSeller) - Number(a.isBestSeller));
      break;
  }

  return list;
};
