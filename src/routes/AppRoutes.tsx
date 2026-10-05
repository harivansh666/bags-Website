import { Routes, Route } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { HomePage } from "@/pages/HomePage";
import { ShopPage } from "@/pages/ShopPage";
import { CollectionsPage } from "@/pages/CollectionsPage";
import { CollectionDetailPage } from "@/pages/CollectionDetailPage";
import { ProductDetailPage } from "@/pages/ProductDetailPage";
import { CartPage } from "@/pages/CartPage";
import { WishlistPage } from "@/pages/WishlistPage";
import { CheckoutPage } from "@/pages/CheckoutPage";
import { AboutPage } from "@/pages/AboutPage";
import { AccountPage } from "@/pages/AccountPage";
import { OrderDetailPage } from "@/pages/OrderDetailPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

export function AppRoutes() {
  return (
    <Routes>
      {/* Checkout page has its own standalone layout */}
      <Route path="/checkout" element={<CheckoutPage />} />

      {/* Main pages wrapped in AppShell */}
      <Route
        path="*"
        element={
          <AppShell>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/bags" element={<ShopPage category="Bags" />} />
              <Route path="/stationery" element={<ShopPage category="Stationery" />} />
              <Route path="/desk" element={<ShopPage category="Desk" />} />
              <Route path="/gifts" element={<ShopPage category="Gifts" />} />

              <Route path="/collections" element={<CollectionsPage />} />
              <Route path="/collections/:slug" element={<CollectionDetailPage />} />
              <Route path="/product/:slug" element={<ProductDetailPage />} />
              <Route path="/product/id/:id" element={<ProductDetailPage />} />

              <Route path="/cart" element={<CartPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/about" element={<AboutPage />} />

              <Route path="/account" element={<AccountPage />} />
              <Route path="/account/orders/:orderId" element={<OrderDetailPage />} />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AppShell>
        }
      />
    </Routes>
  );
}
