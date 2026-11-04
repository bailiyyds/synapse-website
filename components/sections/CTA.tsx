import { ui } from "@/lib/constants";
import AccessForm from "./AccessForm";
import LatticeLayer from "@/components/visual/LatticeLayer";
import { copy } from "@/lib/constants";
export default function CTA() {
  return (
    <section id="access" className="cta" aria-labelledby="access-title">
      <LatticeLayer close />
      <p className="eyebrow">{ui.text21}</p>
      <h2 id="access-title">
        {ui.text22}
        <br />
        <span className="serif">starts here.</span>
      </h2>
      <p>{ui.text23}</p>
      <AccessForm />
      <small>{ui.text24}</small>
    </section>
  );
}
