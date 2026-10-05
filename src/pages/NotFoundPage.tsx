import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <div className="empty-page page-pad">
      <h2>404 — OBJECT NOT FOUND</h2>
      <p>The page or object you are looking for has moved or does not exist.</p>
      <Button asChild>
        <Link to="/shop">RETURN TO SHOP</Link>
      </Button>
    </div>
  );
}
