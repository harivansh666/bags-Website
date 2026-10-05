import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useUiStore } from "@/store/useUiStore";

export function MobileMenu() {
  const { mobileMenuOpen, setMobileMenuOpen } = useUiStore();

  const links = [
    { label: "SHOP", to: "/shop" },
    { label: "BAGS", to: "/bags" },
    { label: "STATIONERY", to: "/stationery" },
    { label: "COLLECTIONS", to: "/collections" },
    { label: "ABOUT", to: "/about" },
  ];

  return (
    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
      <SheetContent side="left" className="mobile-menu">
        <SheetTitle className="wordmark">MORROW®</SheetTitle>
        <SheetDescription className="sr-only">Main navigation</SheetDescription>
        <nav>
          {links.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>0{i + 1}</span>
              {link.label}
            </Link>
          ))}
          <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)}>
            <span>06</span>WISHLIST
          </Link>
          <Link to="/account" onClick={() => setMobileMenuOpen(false)}>
            <span>07</span>ACCOUNT
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
