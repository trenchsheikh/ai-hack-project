import { ArrowRight, ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section id="home" data-slot="hero" className="nexa-hero">
      <div className="nexa-hero-orbit" aria-hidden="true"><span/><span/></div>
      <div className="nexa-hero-content">
        <div className="nexa-eyebrow"><span className="nexa-eyebrow-line"/> FOR EVERY CURIOUS MIND</div>
        <h1>You have more in you.<br/><em>Let's find out what.</em></h1>
        <p>Not everyone starts with experience, a network or a clear idea of where they belong. But everyone deserves the chance to discover what they're capable of. Explore what you care about, learn by doing, and make something that's yours.</p>
        <div className="nexa-hero-actions">
          <a href="/waitlist" className="nexa-primary-action">Be first to join <ArrowRight size={18}/></a>
          <a href="#why" className="nexa-outline-action">Discover Fhilo <ArrowDown size={17}/></a>
        </div>
        <span className="nexa-hero-caption">For the curious, the creative, and everyone still finding their way.</span>
      </div>
    </section>
  );
}
