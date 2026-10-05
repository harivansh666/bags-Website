import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useProductStore } from "@/store/useProductStore";

export function CollectionsPage() {
  const collections = useProductStore((state) => state.collections);

  return (
    <div className="page-pad editorial-page">
      <header>
        <span>CURATED / 2026</span>
        <h1>COLLECTIONS</h1>
        <p>Objects grouped by the lives they are made to support.</p>
      </header>
      <div className="collections-list">
        {collections.map((c, i) => (
          <Link to={`/collections/${c.slug}`} key={c.slug}>
            <span>0{i + 1}</span>
            <img src={c.image} alt={c.name} width={180} height={110} />
            <div>
              <h2>{c.name}</h2>
              <p>{c.line}</p>
            </div>
            <ArrowRight />
          </Link>
        ))}
      </div>
    </div>
  );
}
