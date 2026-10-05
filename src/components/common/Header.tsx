import { Link, useLocation } from "react-router-dom";
import { Search, UserRound, ShoppingBag, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeButton } from "./ThemeButton";
import { useUiStore } from "@/store/useUiStore";
import { useCartStore, selectCartCount } from "@/store/useCartStore";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut";

export function Header() {
  const location = useLocation();
  const { isScrolled, scrollY } = useScrollPosition();

  const setCartDrawerOpen = useUiStore((state) => state.setCartDrawerOpen);
  const setSearchModalOpen = useUiStore((state) => state.setSearchModalOpen);
  const setMobileMenuOpen = useUiStore((state) => state.setMobileMenuOpen);

  const cart = useCartStore((state) => state.cart);
  const cartCount = selectCartCount(cart);

  // Cmd+K or Ctrl+K shortcut to open search
  useKeyboardShortcut("k", () => setSearchModalOpen(true), true);

  const navLinks = [
    { label: "SHOP", to: "/shop" },
    { label: "BAGS", to: "/bags" },
    { label: "STATIONERY", to: "/stationery" },
    { label: "COLLECTIONS", to: "/collections" },
    { label: "ABOUT", to: "/about" },
  ];

  const maxScroll = typeof window === "undefined" ? 1 : Math.max(1, document.body.scrollHeight - window.innerHeight);
  const scrollRatio = Math.min(1, Math.max(0, scrollY / maxScroll));

  return (
    <>
      <div
        className="scroll-line"
        style={{ transform: `scaleX(${scrollRatio})` }}
      />
      <header className={`site-header ${isScrolled || location.pathname !== "/" ? "header-solid" : ""}`}>
        <Link to="/" className="wordmark" aria-label="MORROW Objects home">
          MORROW<span>®</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={location.pathname === link.to ? "active" : ""}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchModalOpen(true)}
            aria-label="Search"
          >
            <Search />
          </Button>
          <Link to="/account" className="icon-link desktop-only" aria-label="Account">
            <UserRound />
          </Link>
          <ThemeButton />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCartDrawerOpen(true)}
            aria-label={`Cart with ${cartCount} items`}
            className="cart-button"
          >
            <ShoppingBag />
            <span>{cartCount}</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="mobile-only"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu />
          </Button>
        </div>
      </header>
    </>
  );
}
