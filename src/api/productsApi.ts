import type { Collection, Category, Product } from "@/types/product";

import bagImg from "@/assets/bag-black.jpg";
import deskImg from "@/assets/desk.jpg";
import giftImg from "@/assets/gift.jpg";
import heroImg from "@/assets/hero-tote.jpg";
import lifestyleImg from "@/assets/lifestyle.jpg";
import plannerImg from "@/assets/planner.jpg";
import slingImg from "@/assets/sling.jpg";
import stationeryImg from "@/assets/stationery.jpg";
import axiosInstance from "@/lib/axiosInstance";

const specs: Array<[string, Category, string, number, string, string, string[]]> = [
  ["Everyday Tote", "Bags", "Tote Bags", 1499, "Washed canvas", "daily-carry", ["Best Seller"]],
  ["Daily Carry Backpack", "Bags", "Backpacks", 2999, "Recycled nylon", "daily-carry", ["Best Seller"]],
  ["Arc Sling", "Bags", "Sling Bags", 1899, "Technical twill", "mono", ["New"]],
  ["Studio Laptop Bag", "Bags", "Laptop Bags", 2499, "Cotton canvas", "daily-carry", []],
  ["Fold Crossbody", "Bags", "Crossbody Bags", 1699, "Recycled nylon", "mono", []],
  ["Weekend Holdall", "Bags", "Travel Bags", 4299, "Heavy canvas", "weekend", ["Limited"]],
  ["Mono Journal", "Stationery", "Journals", 499, "FSC paper, book cloth", "study", ["Best Seller"]],
  ["Grid Notebook", "Stationery", "Notebooks", 349, "100 gsm grid paper", "study", []],
  ["Undated Planner", "Stationery", "Planners", 699, "FSC paper, linen", "study", ["New"]],
  ["Form Fountain Pen", "Stationery", "Pens", 1299, "Anodised aluminium", "mono", []],
  ["Graphite Pencil Set", "Stationery", "Pencils", 299, "Cedar, graphite", "study", []],
  ["Canvas Pencil Case", "Stationery", "Pencil Cases", 599, "Cotton canvas", "study", ["Best Seller"]],
  ["Index Sticky Notes", "Stationery", "Sticky Notes", 249, "Recycled paper", "study", []],
  ["Desk Organizer", "Desk", "Desk Organizers", 899, "Powder-coated steel", "desk-edit", ["Best Seller"]],
  ["Column Pen Holder", "Desk", "Pen Holders", 649, "Cast aluminium", "desk-edit", []],
  ["Orbit Paperweight", "Desk", "Accessories", 799, "Solid stainless steel", "desk-edit", ["New"]],
  ["Archive Tray", "Desk", "Storage", 1199, "Powder-coated steel", "desk-edit", []],
  ["Felt Desk Mat", "Desk", "Accessories", 1499, "Recycled felt", "desk-edit", []],
  ["Focus Timer", "Desk", "Accessories", 999, "Aluminium, glass", "desk-edit", ["Limited"]],
  ["Writer’s Gift Set", "Gifts", "Gift Sets", 1999, "Mixed materials", "mono", ["Best Seller"]],
  ["Pocket Pair", "Gifts", "Under ₹999", 799, "FSC paper, brass", "study", []],
  ["The Desk Set", "Gifts", "Premium Gifts", 3499, "Steel, paper, aluminium", "desk-edit", ["Limited"]],
  ["Travel Notes Set", "Gifts", "Gift Sets", 1299, "Canvas, FSC paper", "weekend", ["New"]],
  ["Everyday Objects Box", "Gifts", "Premium Gifts", 2799, "Mixed materials", "daily-carry", []],
];

const imageFor = (category: Category, index: number): string => {
  if (category === "Bags") return [heroImg, bagImg, slingImg, lifestyleImg][index % 4] ?? heroImg;
  if (category === "Stationery") return [stationeryImg, plannerImg][index % 2] ?? stationeryImg;
  if (category === "Desk") return deskImg;
  return giftImg;
};

export const MOCK_PRODUCTS: Product[] = specs.map(
  ([name, category, subcategory, price, material, collection, tags], index) => ({
    id: index + 1,
    name,
    slug: name.toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    category,
    subcategory,
    price,
    compareAtPrice: index % 7 === 0 ? Math.round(price * 1.18) : undefined,
    description: `${name} brings quiet utility to daily routines, balancing considered proportions with materials chosen to age beautifully.`,
    images: [imageFor(category, index), imageFor(category, index + 1)],
    colors: category === "Stationery" ? ["Black", "Ivory", "Graphite"] : ["Black", "Natural", "Stone"],
    sizes: category === "Bags" ? ["One size"] : ["Standard"],
    material,
    rating: 4.6 + (index % 4) / 10,
    reviewCount: 28 + index * 7,
    stock: index % 9 === 0 ? 4 : 18,
    isFeatured: index < 8,
    isBestSeller: tags.includes("Best Seller"),
    tags,
    collection,
  })
);

export const MOCK_COLLECTIONS: Collection[] = [
  { slug: "daily-carry", name: "The Daily Carry", line: "For movement, meetings, and everything between.", image: heroImg },
  { slug: "desk-edit", name: "The Desk Edit", line: "Make space for better ideas.", image: deskImg },
  { slug: "study", name: "The Study Collection", line: "Tools for focused thought.", image: stationeryImg },
  { slug: "weekend", name: "The Weekend Collection", line: "Less planning. Better packing.", image: lifestyleImg },
  { slug: "mono", name: "The Mono Collection", line: "One palette. Endless utility.", image: slingImg },
];

/**
 * Product API Layer.
 * Replace simulation logic with real apiFetch calls when ready!
 */
export const productsApi = {
  async getProducts(): Promise<Product[]> {
    try {
      const response = await axiosInstance.get("/product/list");
      const resData = response.data;

      // Extract array from response whether it's productList, products, data, etc.
      let rawList: any[] = [];
      if (Array.isArray(resData?.data?.productList)) {
        rawList = resData.data.productList;
      }

      if (Array.isArray(rawList) && rawList.length > 0) {
        return rawList.map((item: any, index: number) => {
          const rawCat = Array.isArray(item.category) ? item.category[0] : item.category;
          const categoryVal = rawCat ? String(rawCat) as Category : "Bags";

          const images = Array.isArray(item.imageUrl) && item.imageUrl.length > 0
            ? item.imageUrl
            : (item.image ? [item.image] : [MOCK_PRODUCTS[index % MOCK_PRODUCTS.length].images[0]]);

          return {
            id: item.id || index + 1,
            name: item.name || "Product",
            slug: item.slug || (item.name ? item.name.toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") : `product-${item.id}`),
            category: categoryVal,
            subcategory: Array.isArray(item.category) && item.category[1] ? item.category[1] : categoryVal,
            price: typeof item.offerPrice !== "undefined" && item.offerPrice !== null && Number(item.offerPrice) > 0 ? Number(item.offerPrice) : Number(item.price || 0),
            compareAtPrice: item.offerPrice && Number(item.offerPrice) < Number(item.price) ? Number(item.price) : undefined,
            description: item.description || "",
            images: images,
            colors: ["Default"],
            sizes: ["Standard"],
            material: "Crafted Material",
            rating: Number(item.rating) > 0 ? Number(item.rating) : 4.5,
            reviewCount: 10,
            stock: typeof item.quantity !== "undefined" ? item.quantity : (item.inStock !== false ? 10 : 0),
            isFeatured: !!item.isFeatured,
            isBestSeller: !!item.isFeatured,
            tags: item.isFeatured ? ["Featured"] : [],
            collection: "daily-carry",
          };
        });
      }
      return MOCK_PRODUCTS;
    } catch (error) {
      console.warn("Failed to fetch product list from backend, falling back to mock data:", error);
      return MOCK_PRODUCTS;
    }
  },

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return new Promise((resolve) =>
      setTimeout(() => resolve(MOCK_PRODUCTS.find((p) => p.slug === slug)), 100)
    );
  },

  async getCollections(): Promise<Collection[]> {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_COLLECTIONS), 100));
  },

  async getCollectionBySlug(slug: string): Promise<Collection | undefined> {
    return new Promise((resolve) =>
      setTimeout(() => resolve(MOCK_COLLECTIONS.find((c) => c.slug === slug)), 100)
    );
  },
  async getProductById(id: string | number) {
    try {
      const response = await axiosInstance.get(`/product/${id}`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch product by ID:", error);
      throw error;
    }
  },

};
