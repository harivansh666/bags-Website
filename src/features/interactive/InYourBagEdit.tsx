import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { formatPrice } from "@/utils/formatPrice";
import { useProductStore } from "@/store/useProductStore";

export function InYourBagEdit() {
  const products = useProductStore((state) => state.products);
  const [bagItem, setBagItem] = useState("Notebook");

  const keyword = bagItem.toLowerCase().split(" ")[0] ?? bagItem.toLowerCase();
  const selectedProduct =
    products.find((p) => p.name.toLowerCase().includes(keyword)) ??
    products[6] ??
    products[0];

  if (!selectedProduct) return null;

  const options = ["Notebook", "Pen", "Laptop", "Headphones", "Wallet", "Bottle"];

  return (
    <section className="in-your-bag page-pad">
      <div className="bag-copy">
        <span>04 / INTERACTIVE EDIT</span>
        <h2>
          WHAT’S IN
          <br />
          YOUR <em>BAG?</em>
        </h2>
        <p>Six small essentials. One considered daily system. Select an object to see the piece.</p>
        <div className="bag-options">
          {options.map((item, i) => (
            <button
              className={bagItem === item ? "active" : ""}
              onClick={() => setBagItem(item)}
              key={item}
            >
              <span>0{i + 1}</span>
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="bag-visual">
        <img
          src={selectedProduct.images[0]}
          alt={selectedProduct.name}
          width={1200}
          height={1504}
          loading="lazy"
        />
        <div className="object-callout">
          <span>SELECTED OBJECT</span>
          <strong>{selectedProduct.name}</strong>
          <Link to={`/product/${selectedProduct.slug}`}>
            {formatPrice(selectedProduct.price)} <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
