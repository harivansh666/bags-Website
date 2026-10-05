import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { ProductGrid } from "@/features/catalog/ProductGrid";
import { useUiStore } from "@/store/useUiStore";
import { useProductStore } from "@/store/useProductStore";

export function SearchOverlay() {
  const { searchModalOpen, setSearchModalOpen, searchQuery, setSearchQuery } = useUiStore();
  const { products, collections } = useProductStore();

  const results = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return products
      .filter(
        (p) =>
          `${p.name} ${p.category} ${p.subcategory} ${p.tags.join(" ")}`
            .toLowerCase()
            .includes(query)
      )
      .slice(0, 8);
  }, [searchQuery, products]);

  return (
    <Dialog open={searchModalOpen} onOpenChange={setSearchModalOpen}>
      <DialogContent className="search-overlay">
        <DialogTitle>SEARCH MORROW</DialogTitle>
        <DialogDescription>Products, categories and collections</DialogDescription>
        <div className="search-field">
          <Search />
          <input
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="What are you looking for?"
            aria-label="Search products"
          />
          <kbd>ESC</kbd>
        </div>

        {!searchQuery && (
          <div className="search-suggestions">
            <div>
              <span>POPULAR</span>
              {["Black tote", "Grid notebook", "Desk organizer", "Gifts under ₹999"].map((term) => (
                <button key={term} onClick={() => setSearchQuery(term)}>
                  {term}
                  <ArrowRight />
                </button>
              ))}
            </div>
            <div>
              <span>COLLECTIONS</span>
              {collections.slice(0, 4).map((c) => (
                <Link
                  key={c.slug}
                  to={`/collections/${c.slug}`}
                  onClick={() => setSearchModalOpen(false)}
                >
                  {c.name}
                  <ArrowRight />
                </Link>
              ))}
            </div>
          </div>
        )}

        {searchQuery && (
          <div className="search-results">
            <p>{results.length} RESULTS</p>
            <ProductGrid items={results} />
            {!results.length && (
              <div className="empty">
                <p>No objects found for “{searchQuery}”.</p>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
