import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/utils/formatPrice";
import { useCartStore, selectCartSummary } from "@/store/useCartStore";
import { useProductStore } from "@/store/useProductStore";

export function CheckoutPage() {
  const { cart, clearCart } = useCartStore();
  const products = useProductStore((state) => state.products);
  const summary = selectCartSummary(cart, products);

  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const stepFields =
    step === 1
      ? ["Email address", "Phone number"]
      : step === 2
      ? ["Full name", "Street address", "City", "PIN code"]
      : ["Card number", "MM / YY", "CVV"];

  if (step === 4) {
    return (
      <div className="confirmation">
        <Check />
        <span>ORDER CONFIRMED</span>
        <h1>
          Thank you.
          <br />
          <em>It’s on its way.</em>
        </h1>
        <p>Order #MRW-1024 · A confirmation has been prepared for this demo purchase.</p>
        <Button
          onClick={() => {
            clearCart();
            navigate("/");
          }}
        >
          RETURN HOME
        </Button>
      </div>
    );
  }

  return (
    <div className="checkout">
      <header>
        <Link to="/" className="wordmark">
          MORROW®
        </Link>
        <span>SECURE CHECKOUT</span>
      </header>

      <div className="checkout-layout">
        <section>
          <div className="steps">
            {["Contact", "Shipping", "Payment", "Confirmation"].map((label, i) => (
              <div className={step >= i + 1 ? "active" : ""} key={label}>
                <span>{i + 1}</span>
                {label}
              </div>
            ))}
          </div>

          <button
            className="back"
            onClick={() => step > 1 && setStep(step - 1)}
            disabled={step <= 1}
          >
            <ArrowLeft /> BACK
          </button>

          <h1>
            {step === 1
              ? "Where should we reach you?"
              : step === 2
              ? "Where is this going?"
              : "Complete your order."}
          </h1>
          <p>
            {step === 3
              ? "This is a secure demo. No payment will be processed."
              : "Guest checkout — no account needed."}
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setStep(step + 1);
            }}
          >
            {stepFields.map((field) => (
              <label key={field}>
                {field}
                <input required placeholder={field} />
              </label>
            ))}

            {step === 2 && (
              <label className="check-row">
                <input type="checkbox" /> Save this address for next time
              </label>
            )}

            {step === 3 && (
              <div className="payment-methods">
                <label>
                  <input type="radio" name="pay" defaultChecked /> Card
                </label>
                <label>
                  <input type="radio" name="pay" /> UPI
                </label>
                <label>
                  <input type="radio" name="pay" /> Cash on delivery
                </label>
              </div>
            )}

            <Button type="submit">
              {step === 3 ? "PLACE DEMO ORDER" : "CONTINUE"} <ArrowRight />
            </Button>
          </form>
        </section>

        <aside>
          <h2>ORDER SUMMARY</h2>
          {cart.map((line) => {
            const product = products.find((x) => x.id === line.productId);
            return product ? (
              <div className="checkout-item" key={product.id}>
                <img src={product.images[0]} alt={product.name} />
                <span>
                  {product.name}
                  <small>QTY {line.quantity}</small>
                </span>
                <strong>{formatPrice(product.price * line.quantity)}</strong>
              </div>
            ) : null;
          })}
          <div className="checkout-total">
            <span>TOTAL</span>
            <strong>{formatPrice(summary.total)}</strong>
          </div>
        </aside>
      </div>
    </div>
  );
}
