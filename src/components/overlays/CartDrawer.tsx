import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Quantity } from "@/features/catalog/Quantity";
import { formatPrice } from "@/utils/formatPrice";

import { useUiStore } from "@/store/useUiStore";
import { useCartStore, selectCartSummary } from "@/store/useCartStore";
import { useProductStore } from "@/store/useProductStore";

export function CartDrawer() {
  const { cartDrawerOpen, setCartDrawerOpen } = useUiStore();
  const { cart, updateQuantity, removeFromCart } = useCartStore();
  const products = useProductStore((state) => state.products);

  const summary = selectCartSummary(cart, products);

  return (
    <Sheet open={cartDrawerOpen} onOpenChange={setCartDrawerOpen}>
      <SheetContent className="cart-drawer">
        <div className="flex flex-col gap-2 pb-4 border-b border-border">
          <SheetTitle className="text-xl font-medium tracking-wide flex justify-between items-center pr-6">
            <span>YOUR BAG</span>
            <span className="text-sm font-normal text-muted-foreground">({cart.length.toString().padStart(2, "0")})</span>
          </SheetTitle>
          <SheetDescription className="sr-only">Your shopping bag</SheetDescription>

          <div className="shipping-meter mt-2">
            <div style={{ width: `${Math.min(100, summary.subtotal / 19.99)}%` }} />
          </div>
          <p className="text-[10px] tracking-wider text-muted-foreground uppercase">
            {summary.hasFreeShipping
              ? "YOU’VE UNLOCKED FREE SHIPPING"
              : `${formatPrice(summary.amountAwayFromFreeShipping)} AWAY FROM FREE SHIPPING`}
          </p>
        </div>

        <div className="cart-lines">
          {cart.length === 0 ? (
            <div className="empty">
              <ShoppingBag />
              <p>Your bag is waiting.</p>
              <Button onClick={() => setCartDrawerOpen(false)}>
                CONTINUE BROWSING
              </Button>
            </div>
          ) : (
            cart.map((line) => {
              const product = products.find((x) => String(x.id) === String(line.productId));
              if (!product) return null;
              return (
                <div className="cart-line" key={product.id}>
                  <img src={product.images[0]} alt={product.name} width={180} height={220} />
                  <div>
                    <h3>{product.name}</h3>
                    <p>
                      {line.color} · {product.material}
                    </p>
                    <strong>{formatPrice(product.price)}</strong>
                    <Quantity
                      value={line.quantity}
                      onChange={(n) => updateQuantity(product.id, n)}
                    />
                    <button
                      className="text-action"
                      onClick={() => removeFromCart(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div>
              <span>SUBTOTAL</span>
              <strong>{formatPrice(summary.subtotal)}</strong>
            </div>
            <Button asChild variant="outline">
              <Link to="/cart" onClick={() => setCartDrawerOpen(false)}>
                VIEW CART
              </Link>
            </Button>
            <Button asChild>
              <Link to="/checkout" onClick={() => setCartDrawerOpen(false)}>
                CHECKOUT <ArrowRight />
              </Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
