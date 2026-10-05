import { Link } from "react-router-dom";
import { ChevronRight, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AccountPage() {
  const tabs = ["Overview", "Orders", "Wishlist", "Addresses", "Profile", "Settings"];

  return (
    <div className="page-pad account-page">
      <header>
        <span>ACCOUNT / DEMO</span>
        <h1>
          GOOD MORNING,
          <br />
          <em>AANYA.</em>
        </h1>
      </header>

      <div className="account-grid">
        <nav>
          {tabs.map((tab, i) => (
            <button className={i === 0 ? "active" : ""} key={tab}>
              {tab}
              <ChevronRight />
            </button>
          ))}
        </nav>

        <section>
          <span>RECENT ORDER</span>
          <Link to="/account/orders/1001" className="order-card">
            <div>
              <small>ORDER #1001</small>
              <h2>3 everyday objects</h2>
              <p>Placed 14 September 2026</p>
            </div>
            <strong>₹2,499</strong>
            <span className="status">
              <Check /> DELIVERED
            </span>
            <ArrowRight />
          </Link>

          <div className="account-panels">
            <article>
              <span>DEFAULT ADDRESS</span>
              <h3>Aanya Mehta</h3>
              <p>
                Indiranagar
                <br />
                Bengaluru 560038
              </p>
              <Button variant="outline">EDIT</Button>
            </article>
            <article>
              <span>PROFILE</span>
              <h3>Aanya Mehta</h3>
              <p>
                aanya@example.com
                <br />
                +91 90000 00000
              </p>
              <Button variant="outline">EDIT</Button>
            </article>
          </div>
        </section>
      </div>
    </div>
  );
}
