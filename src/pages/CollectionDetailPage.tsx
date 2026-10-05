import { useParams } from "react-router-dom";
import { ProductGrid } from "@/features/catalog/ProductGrid";
import { Newsletter } from "@/components/common/Newsletter";
import { useProductStore } from "@/store/useProductStore";

export function CollectionDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { collections, products } = useProductStore();

  const collection = collections.find((x) => x.slug === slug) ?? collections[0];

  if (!collection) return null;

  const items = products.filter((p) => p.collection === collection.slug);

  return (
    <div className="collection-page">
      <section className="collection-hero">
        <img src={collection.image} alt={collection.name} width={1440} height={1800} />
        <div>
          <span>COLLECTION / {collection.slug.toUpperCase()}</span>
          <h1>{collection.name}</h1>
          <p>{collection.line}</p>
        </div>
      </section>
      <section className="collection-story page-pad">
        <span>THE STORY</span>
        <h2>Made for the rhythm of a thoughtful day.</h2>
        <p>
          Every piece in this edit shares a restrained visual language and an insistence on usefulness. Nothing extra, nothing overlooked.
        </p>
      </section>
      <section className="page-pad">
        <ProductGrid items={items} />
      </section>
      <Newsletter />
    </div>
  );
}
