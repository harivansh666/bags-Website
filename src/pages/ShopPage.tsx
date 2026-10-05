import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { ProductGrid } from "@/features/catalog/ProductGrid";
import { useProductStore } from "@/store/useProductStore";
import type { Category, SortOption } from "@/types/product";

interface ShopPageProps {
  category?: Category;
}

export function ShopPage({ category }: ShopPageProps) {
  const products = useProductStore((state) => state.products);
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  useEffect(() => {
    fetchProducts();
    console.log("products===>", products)
  }, [fetchProducts]);

  const [sort, setSort] = useState<SortOption>("featured");
  const [filterOpen, setFilterOpen] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);

  const baseProducts = useMemo(() => {
    if (!category) return products;
    const catLower = category.toLowerCase();
    return products.filter((p) => {
      if (!p.category) return true;
      const pCatLower = String(p.category).toLowerCase();
      // Match exact, plural/singular or substring (e.g. "Travel Bag" matches "bags")
      return (
        pCatLower === catLower ||
        pCatLower.includes(catLower.replace(/s$/, "")) ||
        catLower.includes(pCatLower.replace(/s$/, ""))
      );
    });
  }, [category, products]);

  const shownProducts = useMemo(() => {
    let next = inStockOnly ? baseProducts.filter((p) => p.stock > 0) : [...baseProducts];
    return next.sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      if (sort === "new") return b.id - a.id;
      return Number(b.isBestSeller) - Number(a.isBestSeller);
    });
  }, [baseProducts, sort, inStockOnly]);

  const filterSidebar = (
    <div className="filters">
      {["Category", "Price", "Color", "Material", "Size", "Rating"].map((title) => (
        <Accordion type="single" collapsible key={title}>
          <AccordionItem value={title}>
            <AccordionTrigger>{title}</AccordionTrigger>
            <AccordionContent>
              {title === "Price" ? "₹0 — ₹5,000+" : `All ${title.toLowerCase()} options`}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => setInStockOnly(e.target.checked)}
        />{" "}
        In stock only
      </label>
    </div>
  );

  const categoryDescriptions: Record<string, string> = {
    Bags: "Designed to carry what matters.",
    Stationery: "Think better on paper.",
    Desk: "Make space for ideas.",
    Gifts: "Things worth giving.",
  };

  const currentCategory = category ?? "SHOP";
  const subtitle = category ? categoryDescriptions[category] : "Beautiful things for everyday life.";

  return (
    <div className="listing page-pad">
      <div className="breadcrumbs">
        <Link to="/">HOME</Link> / {currentCategory}
      </div>
      <header className="listing-head">
        <div>
          <span>01 / CATALOGUE</span>
          <h1>{category?.toUpperCase() ?? "ALL OBJECTS"}</h1>
          <p>{subtitle}</p>
        </div>
        <strong>{shownProducts.length.toString().padStart(2, "0")} OBJECTS</strong>
      </header>

      <div className="listing-tools">
        <Button
          variant="outline"
          onClick={() => setFilterOpen(true)}
          className="filter-mobile"
        >
          FILTER <ChevronDown />
        </Button>
        <label>
          SORT{" "}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
          >
            <option value="featured">Featured</option>
            <option value="new">Newest</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </label>
      </div>

      <div className="listing-layout">
        <aside>{filterSidebar}</aside>
        <ProductGrid items={shownProducts} />
      </div>

      <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
        <SheetContent side="bottom" className="filter-sheet">
          <SheetTitle>FILTER OBJECTS</SheetTitle>
          <SheetDescription className="sr-only">Product filters</SheetDescription>
          {filterSidebar}
          <Button onClick={() => setFilterOpen(false)}>
            SHOW {shownProducts.length} OBJECTS
          </Button>
        </SheetContent>
      </Sheet>
    </div>
  );
}
