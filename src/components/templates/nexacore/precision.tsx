import { ArrowUpRight } from "lucide-react";
const stages=[
  {number:"01",label:"Find your thing",detail:"Explore challenges in the areas you care about."},
  {number:"02",label:"Try something new",detail:"Learn the essentials and start experimenting."},
  {number:"03",label:"Make it yours",detail:"Build a project, see your progress and keep growing."},
];

export function Precision(){
 return (
  <section id="thinking" data-slot="precision" className="nexa-journey">
   <div className="nexa-journey-head">
    <span className="nexa-eyebrow">YOUR JOURNEY</span>
    <h2>Follow what makes you curious.<br/><em>See where it takes you.</em></h2>
    <p>One small step can open a door you didn't know existed. Here's how to take yours.</p>
   </div>
   <div className="nexa-journey-grid">
    {stages.map(stage=><article className="nexa-journey-step" key={stage.number}>
      <span className="nexa-journey-num">{stage.number}</span>
      <h3>{stage.label}</h3>
      <p>{stage.detail}</p>
      <ArrowUpRight className="nexa-journey-arrow" size={19}/>
    </article>)}
   </div>
  </section>
 );
}
