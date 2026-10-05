import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/features/catalog/ProductGrid";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useProductStore } from "@/store/useProductStore";
import { useCartStore } from "@/store/useCartStore";

export function WishlistPage() {
  const wishlist = useWishlistStore((state) => state.wishlist);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);

  const products = useProductStore((state) => state.products);
  const addToCart = useCartStore((state) => state.addToCart);

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="page-pad editorial-page">
      <header>
        <span>SAVED / FOR LATER</span>
        <h1>WISHLIST</h1>
        <p>
          {savedProducts.length
            ? `${savedProducts.length} objects worth keeping.`
            : "Nothing saved yet."}
        </p>
      </header>

      {!savedProducts.length ? (
        <div className="empty-page">
          <Heart />
          <h2>Find something worth keeping.</h2>
          <Button asChild>
            <Link to="/shop">EXPLORE OBJECTS</Link>
          </Button>
        </div>
      ) : (
        <>
          <ProductGrid items={savedProducts} />
          <div className="wishlist-actions">
            {savedProducts.map((p) => (
              <div key={p.id}>
                <span>{p.name}</span>
                <Button
                  onClick={() => {
                    addToCart(p.id);
                    toggleWishlist(p.id);
                  }}
                >
                  MOVE TO BAG
                </Button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
