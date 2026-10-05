export type Category = "Bags" | "Stationery" | "Desk" | "Gifts";

export interface Product {
  id: number;
  name: string;
  slug: string;
  category: Category;
  subcategory: string;
  price: number;
  compareAtPrice?: number;
  description: string;
  images: string[];
  colors: string[];
  sizes: string[];
  material: string;
  rating: number;
  reviewCount: number;
  stock: number;
  isFeatured: boolean;
  isBestSeller: boolean;
  tags: string[];
  collection: string;
}

export interface Collection {
  slug: string;
  name: string;
  line: string;
  image: string;
}

export type SortOption = "featured" | "new" | "low" | "high";
