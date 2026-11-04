import React from "react";
import {ArrowRight,ArrowUpRight,ArrowDown,Blocks,Compass,Building2,Sparkles,BookOpen,Users,Globe2,Trophy,CheckCircle2,ChevronRight,Heart,Lightbulb,Code2,Play,ShieldCheck} from "lucide-react";
import {Brand,BrandMark} from "./FhiloBrand";
import {opportunities,industries} from "./fhilo-data";
import "./fhilo.css";
const cards=opportunities.slice(0,3);
function Pill({children}){return <span className="fh-pill">{children}</span>;}
export default function FhiloLanding(){
 const [menu,setMenu]=React.useState(false);
 return <div className="fh-land">
  <header className="fh-header">
   <a href="/" aria-label="Fhilo home"><Brand/></a>
   <nav className={menu?"fh-links open":"fh-links"} aria-label="Main navigation">
    <a href="#discover" onClick={()=>setMenu(false)}>Explore</a>
    <a href="#why" onClick={()=>setMenu(false)}>Why Fhilo</a>
    <a href="/organisations" onClick={()=>setMenu(false)}>For organisations</a>
   </nav>
   <div className="fh-header-actions"><a className="fh-text-link" href="/app">My workspace</a><a className="fh-btn small" href="/app">Get started <ArrowUpRight size={16}/></a><button className="fh-mobile-menu" aria-label="Toggle menu" onClick={()=>setMenu(!menu)}>☰</button></div>
  </header>
  <main>
   <section className="fh-hero">
    <div className="fh-hero-glow" aria-hidden="true"></div>
    <div className="fh-hero-inner">
     <div className="fh-kicker"><span className="fh-blue-dot"></span> Fhilo · Where potential grows</div>
     <h1>Potential is everywhere.<br/><em>Opportunity should be too.</em></h1>
     <p>Discover an industry you love, learn the skills that matter, and build something real. Fhilo brings people and organisations together through practical AI learning and real-world challenges — no experience needed to start.</p>
     <div className="fh-hero-actions"><a className="fh-btn" href="/app/explore">Explore opportunities <ArrowUpRight size={19}/></a><a className="fh-btn outline" href="/organisations">For organisations <ArrowRight size={18}/></a></div>
     <div className="fh-hero-note"><span className="fh-mini-avatars">✦</span> Built for first-timers, curious minds and ambitious builders.</div>
    </div>
    <div className="fh-hero-art" aria-hidden="true">
     <div className="fh-art-ring ring-one"/><div className="fh-art-ring ring-two"/>
     <span className="fh-floating-tag tag-one"><Compass size={16}/> Discover</span>
     <span className="fh-floating-tag tag-two"><Blocks size={16}/> Build</span>
     <span className="fh-floating-tag tag-three"><Heart size={16}/> Belong</span>
     <div className="fh-hero-symbol"><BrandMark size={210}/></div>
    </div>
   </section>
   <section className="fh-section fh-discover" id="discover">
    <div className="fh-section-top"><div><span className="fh-eyebrow">A PLACE TO BEGIN</span><h2>Find something you<br/>care about.</h2></div><p>Explore an industry and discover challenges designed to help you gain confidence, develop skills and create real projects.</p></div>
    <div className="fh-industries">{industries.map(i=><a key={i.id} className={"fh-industry "+i.color} href={"/app/explore?industry="+i.id}><span className="fh-industry-top"><span>{i.name}</span><ArrowUpRight size={19}/></span><span className="fh-industry-detail">{i.detail}</span></a>)}</div>
   </section>
   <section className="fh-section fh-opportunities">
    <div className="fh-section-top"><div><span className="fh-eyebrow">YOUR NEXT STEP</span><h2>Opportunity begins<br/>with trying.</h2></div><p>Real problems, beginner-friendly starting points and room to grow. Start with a practice brief and develop your work inside Fhilo Studio.</p></div>
    <div className="fh-op-grid">{cards.map(c=><a className="fh-op-card" href={"/app/opportunities/"+c.id} key={c.id}><div className="fh-op-photo" style={{backgroundImage:"url("+c.image+")"}}/><div className="fh-op-content"><div className="fh-overline">{c.category} · Practice challenge</div><h3>{c.title}</h3><p>{c.description}</p><span>Explore challenge <ArrowUpRight size={18}/></span></div></a>)}</div>
    <div className="fh-center"><a className="fh-subtle-link" href="/app/explore">Explore all opportunities <ArrowRight size={18}/></a></div>
   </section>
   <section className="fh-section fh-how" id="why">
    <div className="fh-section-top"><div><span className="fh-eyebrow">HOW FHILO WORKS</span><h2>Not just something<br/>to learn. Something to do.</h2></div><p>We believe people should be given the chance to develop their abilities, not expected to prove them before they can begin.</p></div>
    <div className="fh-steps">
     {[{n:"01",title:"Discover",desc:"Choose an industry or challenge that speaks to you.",icon:Compass},{n:"02",title:"Learn",desc:"Understand the problem and build confidence with Sofia.",icon:BookOpen},{n:"03",title:"Create",desc:"Make your project inside Fhilo Studio, from idea to prototype.",icon:Blocks},{n:"04",title:"Grow",desc:"Share your work, receive feedback and unlock the next opportunity.",icon:Sparkles}].map(x=><div key={x.n} className="fh-step"><div className="fh-step-head"><x.icon size={26}/><span>{x.n}</span></div><h3>{x.title}</h3><p>{x.desc}</p></div>)}
    </div>
   </section>
   <section className="fh-org-strip">
    <div className="fh-org-left"><span className="fh-eyebrow light">FOR ORGANISATIONS</span><h2>Don't just find potential.<br/><em>Help create it.</em></h2><p>Fund opportunities, shape real-world challenges and help people build the capabilities your industry needs. Meaningful participation, with outcomes you can understand.</p><a className="fh-btn white" href="/organisations">Partner with Fhilo <ArrowUpRight size={18}/></a></div>
    <div className="fh-org-right"><div className="fh-org-feature"><Building2/><span>Create opportunities</span></div><div className="fh-org-feature"><Users/><span>Develop new talent</span></div><div className="fh-org-feature"><Globe2/><span>Support access</span></div><div className="fh-org-feature"><ShieldCheck/><span>Understand impact</span></div></div>
   </section>
   <section className="fh-section fh-manifesto"><BrandMark size={50}/><h2>Everyone has somewhere<br/>to start.</h2><p>You don't need the right connections, the right experience or the right answers to begin. Just curiosity, and the chance to try.</p><a className="fh-btn" href="/app">Find your starting point <ArrowRight size={18}/></a></section>
  </main>
  <footer className="fh-footer"><Brand/><div><a href="/app/explore">Opportunities</a><a href="/organisations">Organisations</a><a href="/app">Workspace</a></div><small>© {new Date().getFullYear()} Fhilo · Unlock potential. Create opportunity.</small></footer>
 </div>;
}
