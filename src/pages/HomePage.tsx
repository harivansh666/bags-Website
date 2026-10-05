import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/features/catalog/ProductCard";
import { InYourBagEdit } from "@/features/interactive/InYourBagEdit";
import { Newsletter } from "@/components/common/Newsletter";
import { useProductStore } from "@/store/useProductStore";

import heroImg from "@/assets/hero-tote.jpg";
import stationeryImg from "@/assets/stationery.jpg";
import deskImg from "@/assets/desk.jpg";
import lifestyleImg from "@/assets/lifestyle.jpg";
import giftImg from "@/assets/gift.jpg";

export function HomePage() {
  const products = useProductStore((state) => state.products);
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const bestSellers = products.filter((p) => p.isBestSeller);

  const collectionsList = [
    { n: "01", name: "BAGS", line: "Carry beautifully.", image: lifestyleImg, to: "/bags" },
    { n: "02", name: "STATIONERY", line: "Think on paper.", image: stationeryImg, to: "/stationery" },
    { n: "03", name: "DESK", line: "Make space for ideas.", image: deskImg, to: "/desk" },
  ];

  const socialGrid = [stationeryImg, lifestyleImg, deskImg, heroImg, giftImg, stationeryImg];

  return (
    <div className="home">
      <section className="hero">
        <img
          src={heroImg}
          alt="Black Everyday Tote in a sunlit architectural studio"
          width={1440}
          height={1808}
        />
        <div className="hero-shade" />
        <div className="hero-copy">
          <span>01 / DAILY CARRY</span>
          <h1>
            EVERYDAY,
            <br />
            <em>DESIGNED BETTER.</em>
          </h1>
          <p>
            Bags, stationery and everyday objects designed to make ordinary moments feel a little more intentional.
          </p>
          <div>
            <Button asChild>
              <Link to="/shop">
                SHOP COLLECTION <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/bags">EXPLORE BAGS</Link>
            </Button>
          </div>
        </div>
        <div className="hero-note">
          <span>THE EVERYDAY TOTE</span>
          <strong>₹1,499</strong>
        </div>
        <span className="scroll-cue">SCROLL TO DISCOVER ↓</span>
      </section>

      <section className="manifesto reveal">
        <span>DESIGN NOTE / 001</span>
        <h2>We make objects for the small rituals that shape a day.</h2>
        <p>Quietly useful. Tactile. Made to stay.</p>
      </section>

      <section className="collection-edit page-pad">
        <div className="section-head">
          <div>
            <span>02 / COLLECTIONS</span>
            <h2>THE EVERYDAY EDIT</h2>
          </div>
          <Link to="/collections">
            VIEW ALL <ArrowRight />
          </Link>
        </div>
        <div className="collection-grid">
          {collectionsList.map(({ n, name, line, image, to }) => (
            <Link to={to} key={name} className="collection-card">
              <img src={image} alt={`${name} collection`} width={1200} height={1504} loading="lazy" />
              <div>
                <span>
                  {n} — {name}
                </span>
                <h3>{line}</h3>
                <ArrowRight />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bestsellers page-pad">
        <div className="section-head">
          <div>
            <span>03 / MOST LOVED</span>
            <h2>Objects worth keeping.</h2>
          </div>
          <Link to="/shop">
            SHOP ALL <ArrowRight />
          </Link>
        </div>
        <div className="product-rail">
          {bestSellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div>
          DESIGNED FOR EVERYDAY — MADE TO LAST — THINK. WRITE. CARRY. — DESIGNED FOR EVERYDAY — MADE TO LAST —&nbsp;
        </div>
      </div>

      <InYourBagEdit />

      <section className="quote">
        <span>NOTED / 01</span>
        <blockquote style={{ whiteSpace: "pre-line" }}>
          {"“Beautiful enough for my desk.\n"}
          <em>Practical enough for every day.”</em>
        </blockquote>
        <p>— AANYA, BENGALURU</p>
      </section>

      <section className="social page-pad">
        <div className="section-head">
          <div>
            <span>05 / FIELD NOTES</span>
            <h2>@MORROW.OBJECTS</h2>
          </div>
        </div>
        <div className="social-grid">
          {socialGrid.map((img, i) => (
            <div key={i}>
              <img src={img} alt="Morrow Objects studio journal" loading="lazy" width={1200} height={1504} />
              <span>@MORROW.OBJECTS</span>
            </div>
          ))}
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
