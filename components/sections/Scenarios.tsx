import { ui } from "@/lib/constants";
import AccessForm from "./AccessForm";
import LatticeLayer from "@/components/visual/LatticeLayer";
import { copy } from "@/lib/constants";
export default function Scenarios() {
  return (
    <section
      id="scenarios"
      aria-labelledby="scenarios-title"
      className="scenarios"
    >
      <div className="section-head">
        <p className="eyebrow">{ui.text34}</p>
        <h2 id="scenarios-title">
          {ui.text35}
          <br />
          {ui.text36}
        </h2>
      </div>
      <div className="scenario-track">
        {copy.scenes.map(([name, title, desc], i) => (
          <article key={name} className={"scenario scene-" + i}>
            <div className="mono">
              0{i + 1} / 04 <span>{ui.text37}</span>
            </div>
            <div className="scene-art" aria-hidden="true">
              {Array.from({ length: 12 }, (_, j) => (
                <i key={j} style={{ "--i": j } as React.CSSProperties} />
              ))}
            </div>
            <p className="eyebrow">{name}</p>
            <h3>{title}</h3>
            <p>{desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
