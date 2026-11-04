import { Compass, BookOpenText, Lightbulb, Blocks } from "lucide-react";

const steps=[
  {number:"01",name:"Discover",title:"Start with what sparks your curiosity.",description:"Football, creativity, health, community—whatever catches your interest.",Icon:Compass},
  {number:"02",name:"Learn",title:"Grow without needing a head start.",description:"Explore AI in plain language, at your pace and without the pressure.",Icon:BookOpenText},
  {number:"03",name:"Try",title:"Put your ideas into practice.",description:"Take on practical challenges inspired by the world around you.",Icon:Lightbulb},
  {number:"04",name:"Make",title:"Build something you can call your own.",description:"Turn your curiosity into a project you can develop and share.",Icon:Blocks},
];

export function Trusted(){
 return (
  <section id="why" data-slot="trusted" className="nexa-purpose">
   <div className="nexa-section-intro">
    <span className="nexa-eyebrow">WHY FHILO EXISTS</span>
    <h2>Your next chapter shouldn't depend on <em>who you know.</em></h2>
    <p>If you've ever felt that technology, AI or opportunity wasn't made for people like you, this is your invitation in. Bring your interests. Bring your ideas. We'll help you find a place to begin.</p>
   </div>
   <div className="nexa-purpose-grid">
    {steps.map(({number,name,title,description,Icon})=>
      <article className="nexa-purpose-card" key={number}>
       <div className="nexa-purpose-card-top"><Icon size={21} strokeWidth={1.7}/><span>{number}</span></div>
       <span className="nexa-card-label">{name}</span>
       <h3>{title}</h3>
       <p>{description}</p>
      </article>
    )}
   </div>
  </section>
 );
}
