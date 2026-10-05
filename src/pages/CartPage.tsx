import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Quantity } from "@/features/catalog/Quantity";
import { formatPrice } from "@/utils/formatPrice";

import { useCartStore, selectCartSummary } from "@/store/useCartStore";
import { useProductStore } from "@/store/useProductStore";

export function CartPage() {
  const { cart, updateQuantity, removeFromCart, applyPromoCode, discount } = useCartStore();
  const products = useProductStore((state) => state.products);
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const [promoInput, setPromoInput] = useState("");
  const summary = selectCartSummary(cart, products, discount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim()) {
      applyPromoCode(promoInput, products);
    }
  };

  return (
    <div className="page-pad cart-page">
      <header>
        <span>YOUR SELECTION</span>
        <h1>YOUR BAG</h1>
        <p>
          {cart.length} {cart.length === 1 ? "OBJECT" : "OBJECTS"}
        </p>
      </header>

      {cart.length === 0 ? (
        <div className="empty-page">
          <h2>Your bag is empty.</h2>
          <p>Beautiful things are waiting.</p>
          <Button asChild>
            <Link to="/shop">EXPLORE THE SHOP</Link>
          </Button>
        </div>
      ) : (
        <div className="cart-page-layout">
          <div className="cart-table">
            {cart.map((line) => {
              const product = products.find((x) => String(x.id) === String(line.productId));
              if (!product) return null;
              return (
                <article key={product.id}>
                  <img src={product.images[0]} alt={product.name} />
                  <div>
                    <span>{product.category}</span>
                    <h2>{product.name}</h2>
                    <p>
                      {line.color} · {product.material}
                    </p>
                    <button onClick={() => removeFromCart(product.id)}>REMOVE</button>
                  </div>
                  <Quantity
                    value={line.quantity}
                    onChange={(n) => updateQuantity(product.id, n)}
                  />
                  <strong>{formatPrice(product.price * line.quantity)}</strong>
                </article>
              );
            })}
          </div>

          <aside className="summary">
            <h2>ORDER SUMMARY</h2>
            <div className="shipping-meter">
              <div style={{ width: `${Math.min(100, summary.subtotal / 19.99)}%` }} />
            </div>
            <p>
              {summary.hasFreeShipping
                ? "Free shipping unlocked"
                : `${formatPrice(summary.amountAwayFromFreeShipping)} away from free shipping`}
            </p>

            <form onSubmit={handleApplyPromo}>
              <input
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder="Promo code (MORROW10)"
              />
              <Button variant="outline">APPLY</Button>
            </form>

            <dl>
              <div>
                <dt>Subtotal</dt>
                <dd>{formatPrice(summary.subtotal)}</dd>
              </div>
              <div>
                <dt>Shipping</dt>
                <dd>{summary.hasFreeShipping ? "FREE" : formatPrice(summary.shipping)}</dd>
              </div>
              {summary.discount > 0 && (
                <div>
                  <dt>Discount</dt>
                  <dd>−{formatPrice(summary.discount)}</dd>
                </div>
              )}
              <div className="total">
                <dt>TOTAL</dt>
                <dd>{formatPrice(summary.total)}</dd>
              </div>
            </dl>

            <Button asChild>
              <Link to="/checkout">
                CHECKOUT <ArrowRight />
              </Link>
            </Button>
            <small>SECURE DEMO CHECKOUT · TAX INCLUDED</small>
          </aside>
        </div>
      )}
    </div>
  );
}
