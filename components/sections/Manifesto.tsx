import { ui } from "@/lib/constants";
import AccessForm from "./AccessForm";
import LatticeLayer from "@/components/visual/LatticeLayer";
import { copy } from "@/lib/constants";
export default function Manifesto() {
  return (
    <section
      id="manifesto"
      className="manifesto"
      aria-labelledby="manifesto-title"
    >
      <p className="eyebrow">{ui.text30}</p>
      <h2 id="manifesto-title">
        {copy.manifesto.map((line, i) => (
          <span key={line} className={i === 1 ? "muted" : ""}>
            {line}
          </span>
        ))}
      </h2>
      <div className="manifesto-note">
        <span className="serif">Intelligence, in relation.</span>
        <p>
          {ui.text31}
          <br />
          {ui.text32}
        </p>
      </div>
    </section>
  );
}
