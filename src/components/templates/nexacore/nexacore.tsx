import { cn } from "@/lib/utils";
import "./tailwind.css";
import { jakarta } from "./fonts";
import { Freedom } from "./freedom";
import { Hero } from "./hero";
import { Navbar } from "./navbar";
import { NexacoreStyles } from "./styles";
import { Precision } from "./precision";
import { Trusted } from "./trusted";
import { ArrowUpRight } from "lucide-react";

export default function Nexacore() {
  return (
    <div className={cn("nexacore",jakarta.variable,"relative min-h-svh bg-background text-foreground antialiased")}
      style={{fontFamily:"var(--font-nexacore-sans), ui-sans-serif, system-ui, sans-serif"}}>
      <NexacoreStyles />
      <Navbar />
      <main>
        <Hero />
        <Trusted />
        <Freedom />
        <Precision />
        <section className="nexa-closing">
          <div className="nexa-closing-inner">
            <span className="nexa-overline">FOR PEOPLE & ORGANISATIONS</span>
            <h2>Talent is everywhere.<br/><em>The chance to grow should be too.</em></h2>
            <p>Whether you're looking for your first opportunity or hoping to create one for somebody else, there's a place for you in what we're building.</p>
            <div className="nexa-closing-actions">
              <a href="/waitlist" className="nexa-primary-action">Join the waitlist <ArrowUpRight size={17}/></a>
              <a href="/organisations" className="nexa-text-action">For organisations <ArrowUpRight size={17}/></a>
            </div>
          </div>
        </section>
      </main>
      <footer className="nexa-footer"><a href="/" className="nexa-footer-logo">fhilo<span>.</span></a><span>Where potential grows.</span><div><a href="/waitlist">Waitlist</a><a href="/organisations">Organisations</a><a href="/app">Workspace</a></div><small>© {new Date().getFullYear()} Fhilo</small></footer>
    </div>
  );
}
