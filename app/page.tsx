import SmoothScroll from "@/components/layout/SmoothScroll";
import { Header, Footer } from "@/components/layout/Chrome";
import {
  Hero,
  Manifesto,
  Scenarios,
  Metrics,
  Timeline,
  CTA,
} from "@/components/sections/Sections";
import CapabilityGraph from "@/components/sections/CapabilityGraph";
export default function Page() {
  return (
    <>
      <SmoothScroll />
      <Header />
      <main id="main">
        <Hero />
        <Manifesto />
        <CapabilityGraph />
        <Scenarios />
        <Metrics />
        <Timeline />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
