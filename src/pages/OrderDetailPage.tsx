import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { formatPrice } from "@/utils/formatPrice";
import { useProductStore } from "@/store/useProductStore";

export function OrderDetailPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const products = useProductStore((state) => state.products);
  const orderProducts = products.slice(0, 3);

  const steps = ["Confirmed", "Packed", "Shipped", "Delivered"];

  return (
    <div className="page-pad order-page">
      <Link to="/account">
        <ArrowLeft /> BACK TO ACCOUNT
      </Link>

      <header>
        <span>ORDER #{orderId ?? "1001"}</span>
        <h1>Delivered.</h1>
        <p>14 September 2026</p>
      </header>

      <div className="order-progress">
        {steps.map((step) => (
          <div key={step}>
            <Check />
            <span>{step}</span>
          </div>
        ))}
      </div>

      <div className="order-items">
        {orderProducts.map((p) => (
          <article key={p.id}>
            <img src={p.images[0]} alt={p.name} />
            <div>
              <h2>{p.name}</h2>
              <p>Black · Qty 1</p>
            </div>
            <strong>{formatPrice(p.price)}</strong>
          </article>
        ))}
      </div>
    </div>
  );
}
