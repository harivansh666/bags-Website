import type { ReactNode } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { CartDrawer } from "@/components/overlays/CartDrawer";
import { SearchOverlay } from "@/components/overlays/SearchOverlay";
import { MobileMenu } from "@/components/overlays/MobileMenu";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import { Toaster } from "@/components/ui/sonner";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>{children}</main>
      <Footer />
      <CartDrawer />
      <SearchOverlay />
      <MobileMenu />
      <Toaster position="bottom-center" />
    </>
  );
}
