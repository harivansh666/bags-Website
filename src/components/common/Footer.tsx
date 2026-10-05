import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <Link to="/" className="footer-mark">
          MORROW<sup>®</sup>
        </Link>
        <p>
          Beautiful things
          <br />
          for everyday life.
        </p>
      </div>
      <div className="footer-links">
        <div>
          <span>SHOP</span>
          <Link to="/bags">Bags</Link>
          <Link to="/stationery">Stationery</Link>
          <Link to="/desk">Desk</Link>
          <Link to="/gifts">Gifts</Link>
        </div>
        <div>
          <span>ABOUT</span>
          <Link to="/about">Our Story</Link>
          <Link to="/collections">Collections</Link>
          <a href="mailto:hello@morrow.objects">Contact</a>
        </div>
        <div>
          <span>HELP</span>
          <a href="#shipping">Shipping</a>
          <a href="#returns">Returns</a>
          <a href="#faq">FAQ</a>
        </div>
        <div>
          <span>SOCIAL</span>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://pinterest.com" target="_blank" rel="noreferrer">Pinterest</a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 MORROW OBJECTS</span>
        <span>DESIGNED WITH INTENTION</span>
      </div>
    </footer>
  );
}
