import type { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  items: Product[];
}

export function ProductGrid({ items }: ProductGridProps) {
  return (
    <div className="product-grid">
      {items.map((product, i) => (
        <ProductCard product={product} key={product.id || `${product.name}-${i}`} priority={i < 4} />
      ))}
    </div>
  );
}
