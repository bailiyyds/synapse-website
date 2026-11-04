import { ui } from "@/lib/constants";
import AccessForm from "./AccessForm";
import LatticeLayer from "@/components/visual/LatticeLayer";
import { copy } from "@/lib/constants";
export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-top mono">
        {ui.text25}
        <span>{ui.text26}</span>
      </div>
      <LatticeLayer />
      <div className="hero-bottom">
        <div>
          <p className="eyebrow">{ui.text27}</p>
          <h1 id="hero-title">
            {copy.hero[0]}
            <br />
            <em>{copy.hero[1]}</em>
          </h1>
          <p className="hero-caption">{ui.text28}</p>
        </div>
        <aside className="mono">
          SYNAPSE / v0.9
          <br />
          {ui.text29}
          <br />
          2026 <a href="#manifesto">↓</a>
        </aside>
      </div>
    </section>
  );
}
