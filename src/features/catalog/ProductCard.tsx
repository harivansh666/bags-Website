import { Link } from "react-router-dom";
import { Heart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/product";
import { formatPrice } from "@/utils/formatPrice";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useUiStore } from "@/store/useUiStore";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const setCartDrawerOpen = useUiStore((state) => state.setCartDrawerOpen);
  const wishlist = useWishlistStore((state) => state.wishlist);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);

  const isLoved = wishlist.includes(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product.id);
    setCartDrawerOpen(true);
  };

  return (
    <article className="product-card">
      <div className="product-media">
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.images && product.images[0] ? product.images[0] : "/placeholder.jpg"}
            alt={product.name}
            width={1200}
            height={1504}
            loading={priority ? "eager" : "lazy"}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop";
            }}
          />
        </Link>
        {product.tags[0] && <span className="product-badge">{product.tags[0]}</span>}
        <Button
          variant="ghost"
          size="icon"
          className={`wish ${isLoved ? "is-loved" : ""}`}
          onClick={() => toggleWishlist(product.id)}
          aria-label={`${isLoved ? "Remove" : "Add"} ${product.name} ${isLoved ? "from" : "to"} wishlist`}
        >
          <Heart fill={isLoved ? "currentColor" : "none"} />
        </Button>
        <Button className="quick-add" onClick={handleQuickAdd}>
          QUICK ADD <Plus />
        </Button>
      </div>
      <Link to={`/product/${product.slug}`} className="product-copy">
        <div>
          <h3>{product.name.slice(0, 45).toUpperCase() + "..."}</h3>
          <p>{product.subcategory}</p>
        </div>
        <div className="price">
          {formatPrice(product.price)}
          {product.compareAtPrice && <del>{formatPrice(product.compareAtPrice)}</del>}
        </div>
      </Link>
    </article>
  );
}
