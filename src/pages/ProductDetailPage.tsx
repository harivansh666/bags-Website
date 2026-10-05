import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Expand, Heart, PackageCheck, Loader2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

import { ProductGrid } from "@/features/catalog/ProductGrid";
import { Quantity } from "@/features/catalog/Quantity";
import { formatPrice } from "@/utils/formatPrice";

import { useProductStore } from "@/store/useProductStore";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useUiStore } from "@/store/useUiStore";
import { productsApi } from "@/api/productsApi";
import type { Product, Category } from "@/types/product";

interface ApiProduct {
  id: number;
  name: string;
  description: string;
  price: string | number;
  offerPrice?: string | number;
  buyPrice?: string | number;
  category: string[];
  isFeatured: boolean;
  imageUrl: string[];
  quantity: number;
  inStock: boolean;
  rating: string | number;
  createdAt: string;
  updatedAt: string;
}

export function ProductDetailPage() {
  const { slug, id } = useParams<{ slug?: string; id?: string }>();
  const products = useProductStore((state) => state.products);
  const addToCart = useCartStore((state) => state.addToCart);
  const setCartDrawerOpen = useUiStore((state) => state.setCartDrawerOpen);
  const { wishlist, toggleWishlist } = useWishlistStore();

  const [apiProduct, setApiProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fallback to local store product if API fetch is loading or matching by slug
  const storeProduct = products.find((x) => x.slug === slug || x.id.toString() === id) ?? products[0];

  useEffect(() => {
    let isMounted = true;
    const targetId = id || (storeProduct ? storeProduct.id : 1);

    setLoading(true);
    productsApi
      .getProductById(targetId)
      .then((res) => {
        if (!isMounted) return;
        if (res && res.success && res.data && res.data.product) {
          const raw: ApiProduct = res.data.product;

          // Convert backend category array to standard Category
          const mainCategoryStr = Array.isArray(raw.category) ? raw.category[0] : (raw.category || "Bags");
          const category: Category = (["Bags", "Stationery", "Desk", "Gifts"].includes(mainCategoryStr)
            ? mainCategoryStr
            : "Bags") as Category;

          // Map API payload into standard Product interface
          const mappedProduct: Product = {
            id: raw.id,
            name: raw.name,
            slug: raw.name.toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
            category: category,
            subcategory: Array.isArray(raw.category) && raw.category[1] ? raw.category[1] : mainCategoryStr,
            price: typeof raw.offerPrice !== "undefined" && raw.offerPrice !== null ? Number(raw.offerPrice) : Number(raw.price),
            compareAtPrice: raw.offerPrice && Number(raw.offerPrice) < Number(raw.price) ? Number(raw.price) : undefined,
            description: raw.description,
            images: Array.isArray(raw.imageUrl) && raw.imageUrl.length > 0 ? raw.imageUrl : (storeProduct?.images ?? []),
            colors: ["Default", "White Titanium", "Black"],
            sizes: category === "Bags" ? ["One size"] : ["Standard"],
            material: "Premium Crafted Material",
            rating: Number(raw.rating) > 0 ? Number(raw.rating) : 4.8,
            reviewCount: 12,
            stock: raw.quantity ?? 10,
            isFeatured: !!raw.isFeatured,
            isBestSeller: false,
            tags: raw.isFeatured ? ["Featured"] : [],
            collection: "daily-carry",
          };

          setApiProduct(mappedProduct);
        } else {
          setApiProduct(null);
        }
      })
      .catch((err) => {
        console.warn("API product fetch error, using fallback store data:", err);
        if (isMounted) setApiProduct(null);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id, slug, storeProduct]);

  const product = apiProduct || storeProduct;

  const [color, setColor] = useState(product?.colors?.[0] ?? "Black");
  const [quantity, setQuantity] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);

  // Sync color if product changes
  useEffect(() => {
    if (product?.colors?.[0]) {
      setColor(product.colors[0]);
    }
  }, [product]);

  if (!product && loading) {
    return (
      <div className="product-page page-pad flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-neutral-400" />
      </div>
    );
  }

  if (!product) return null;

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product.id, color);
    }
    setCartDrawerOpen(true);
  };

  const activeImage = product.images[imageIndex] ?? product.images[0] ?? "";
  const isLoved = wishlist.includes(product.id);

  const accordionItems = [
    ["DETAILS", product.description],
    ["MATERIAL", product.material],
    ["DIMENSIONS", product.category === "Bags" ? "42 × 36 × 12 cm" : "21 × 14.8 cm"],
    ["SHIPPING", "Complimentary shipping on orders over ₹1,999."],
    ["RETURNS", "Easy returns within 14 days of delivery."],
    ["CARE", "Wipe clean with a soft, slightly damp cloth."],
  ];

  const relatedProducts = products
    .filter((x) => x.category === product.category && x.id !== product.id)
    .slice(0, 4);

  return (
    <div className="product-page page-pad">
      <div className="breadcrumbs">
        <Link to="/">HOME</Link> /{" "}
        <Link to={`/${product.category.slice(0, 4).toUpperCase()}`}>
          {product.category.toUpperCase()}
        </Link>{" "}
        {product.name.toUpperCase()}
      </div>

      <div className="product-layout">
        <div className="gallery">
          <div className="gallery-main">
            <img src={activeImage} alt={`${product.name} view ${imageIndex + 1}`} width={500} height={500} />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setZoomOpen(true)}
              aria-label="View image fullscreen"
            >
              <Expand />
            </Button>
          </div>
          {product.images.length > 1 && (
            <div className="thumbs">
              {product.images.map((img, i) => (
                <button
                  onClick={() => setImageIndex(i)}
                  className={imageIndex === i ? "active" : ""}
                  key={img + i}
                >
                  <img src={img} alt={`Thumbnail ${i + 1}`} width={80} height={80} />
                </button>
              ))}
            </div>
          )}
        </div>

        <aside className="product-info">
          <span>
            {product.category.toUpperCase()} / {product.id.toString().padStart(3, "0")}
          </span>
          <h3 className="text-2xl font-semibold">{product.name}</h3>
          <p className="product-price">
            {formatPrice(product.price)}{" "}
            {product.compareAtPrice && (
              <span className="line-through text-neutral-400 text-base ml-2">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}{" "}
            <small>INCL. TAXES</small>
          </p>
          <div className="rating">
            <span>★★★★★</span> {Number(product.rating).toFixed(1)} · {product.reviewCount} REVIEWS
          </div>
          <p className="lead">{product.description}</p>

          {product.colors && product.colors.length > 0 && (
            <div className="variant">
              <label>
                COLOUR — <strong>{color}</strong>
              </label>
              <div>
                {product.colors.map((c) => (
                  <button
                    key={c}
                    className={color === c ? "active" : ""}
                    onClick={() => setColor(c)}
                  >
                    <i />
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="buy-row">
            <Quantity value={quantity} onChange={(n) => setQuantity(Math.max(1, n))} />
            <Button onClick={handleAdd}>
              ADD TO BAG — {formatPrice(product.price * quantity)}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => toggleWishlist(product.id)}
              aria-label="Add to wishlist"
            >
              <Heart fill={isLoved ? "currentColor" : "none"} />
            </Button>
          </div>

          <Button className="buy-now" variant="outline" asChild>
            <Link to="/checkout" onClick={handleAdd}>
              BUY NOW
            </Link>
          </Button>

          <p className="dispatch">
            <PackageCheck /> IN STOCK ({product.stock} AVAILABLE) · DISPATCHES IN 1–2 DAYS
          </p>

          <Accordion type="single" collapsible className="w-full mt-4">
            {accordionItems.map(([title, body]) => (
              <AccordionItem value={title} key={title}>
                <AccordionTrigger>{title}</AccordionTrigger>
                <AccordionContent>{body}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </aside>
      </div>

      <section className="related">
        <div className="section-head">
          <div>
            <span>YOU MAY ALSO LIKE</span>
            <h2>In good company.</h2>
          </div>
        </div>
        <ProductGrid items={relatedProducts} />
      </section>

      <div className="mobile-buy">
        <span>
          <strong>{product.name}</strong>
          {formatPrice(product.price)}
        </span>
        <Button onClick={handleAdd}>ADD TO BAG</Button>
      </div>

      <Dialog open={zoomOpen} onOpenChange={setZoomOpen}>
        <DialogContent className="image-viewer">
          <DialogTitle className="sr-only">{product.name} fullscreen image</DialogTitle>
          <DialogDescription className="sr-only">Large product image</DialogDescription>
          <img src={activeImage} alt={product.name} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
