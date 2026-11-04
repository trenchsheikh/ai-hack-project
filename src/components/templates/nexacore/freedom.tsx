import { ArrowUpRight, Check } from "lucide-react";

const promises=[
  "You don't need to know how to code.",
  "You don't need a perfect idea.",
  "You don't need the right connections.",
];

export function Freedom(){
 return (
  <section id="method" data-slot="freedom" className="nexa-method">
   <div className="nexa-method-copy">
    <span className="nexa-eyebrow">A DIFFERENT KIND OF STARTING POINT</span>
    <h2>You don't need a head start.<br/><em>Just a place to begin.</em></h2>
    <p>Most opportunities ask you to prove what you can do before you get the chance to learn. We believe it should work the other way around.</p>
    <a href="/waitlist" className="nexa-text-link">Come as you are <ArrowUpRight size={18}/></a>
   </div>
   <div className="nexa-method-panel">
    <div className="nexa-method-symbol" aria-hidden="true"><span/><span/><span/></div>
    <span className="nexa-method-caption">YOUR POTENTIAL COMES FIRST</span>
    <div className="nexa-promise-list">
      {promises.map(item=><div className="nexa-promise" key={item}><Check size={17}/><span>{item}</span></div>)}
    </div>
   </div>
  </section>
 );
}
