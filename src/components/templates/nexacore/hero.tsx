import { ArrowUpRight, ArrowDown } from "lucide-react";
const HERO_VIDEO="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_115655_b4d9cd77-feed-43cd-a198-af78ebdf1f7a.mp4";

export function Hero() {
  return (
    <section id="home" data-slot="hero" className="nexa-restored-hero relative flex min-h-svh items-center justify-center overflow-hidden px-4">
      <video className="absolute inset-0 h-full w-full object-cover" src={HERO_VIDEO} autoPlay muted loop playsInline aria-hidden="true" preload="metadata"/>
      <div aria-hidden className="nexa-hero-blue-wash pointer-events-none absolute inset-0 z-[1]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-48" style={{background:"linear-gradient(to bottom, transparent, #45647D)"}}/>
      <div className="nexa-hero-copy relative z-10 flex w-full max-w-[990px] flex-col items-center gap-6 text-center">
        <h1>Connecting people to AI opportunities <em>and organisations to emerging talent.</em></h1>
        <div className="nexa-hero-actions">
          <a href="/waitlist" className="nexa-primary-action">Be first to join <ArrowUpRight size={19}/></a>
          <a href="#why" className="nexa-hero-secondary">Discover Fhilo <ArrowDown size={17}/></a>
        </div>
      </div>
      <a href="#why" aria-label="Scroll to learn about Fhilo" className="nexa-scroll-indicator"><ArrowDown size={18}/></a>
    </section>
  );
}
