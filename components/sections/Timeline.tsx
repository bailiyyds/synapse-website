import { labels } from "@/lib/constants";
import { ui } from "@/lib/constants";
import AccessForm from "./AccessForm";
import LatticeLayer from "@/components/visual/LatticeLayer";
import { copy } from "@/lib/constants";
export default function Timeline() {
  return (
    <section
      id="timeline"
      className="timeline"
      aria-labelledby="timeline-title"
    >
      <p className="eyebrow">{ui.text38}</p>
      <h2 id="timeline-title">
        {ui.text39}
        <br />
        {ui.text40}
      </h2>
      <div className="timeline-list">
        {[
          [labels.label7, labels.label8],
          [labels.label9, labels.label10],
          [labels.label11, labels.label12],
          [labels.label13, labels.label14],
        ].map(([date, title]) => (
          <article key={date}>
            <small>{date}</small>
            <h3>{title}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
