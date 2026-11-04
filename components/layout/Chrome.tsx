import { ui } from "@/lib/constants";
import { copy } from "@/lib/constants";
export function Header() {
  return (
    <header>
      <a className="brand" href="#">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          aria-hidden="true"
        >
          <path d="M12 2v20M2 12h20M5 5l14 14M5 19L19 5" />
          <circle cx="12" cy="12" r="5" />
        </svg>
        <span>{copy.brand}</span>
        <small>SYNAPSE®</small>
      </a>
      <nav>
        <a href="#manifesto">{ui.text1}</a>
        <a href="#capabilities">{ui.text2}</a>
        <a href="#scenarios">{ui.text3}</a>
      </nav>
      <a href="#access">
        {ui.text4}
        <span>↗</span>
      </a>
    </header>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <h3>{copy.brand}</h3>
          <p>{ui.text5}</p>
        </div>
        <div>
          {ui.text6}
          <a href="#manifesto">{ui.text7}</a>
          <a href="#capabilities">{ui.text8}</a>
        </div>
        <div>
          {ui.text9}
          <a href="#scenarios">{ui.text10}</a>
          <a href="#timeline">{ui.text11}</a>
        </div>
        <div>
          {ui.text12}
          <a href="#access">{ui.text13}</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>{ui.text14}</span>
        <span>
          {ui.text15}
          <i />
        </span>
      </div>
    </footer>
  );
}
