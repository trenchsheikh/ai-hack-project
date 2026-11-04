const NEXACORE_CSS = \`
/* Two-colour re-skin of the original landing design; layouts and media remain intact. */
.nexacore {
  --background:#FAF7F0;
  --nexa-cream:#FAF7F0;
  --nexa-cream-deep:#FAF7F0;
  --nexa-sky:#FAF7F0;
  --nexa-royal:#0A43ED;
  --foreground:#0A43ED;
  --card:#FAF7F0;
  --card-foreground:#0A43ED;
  --popover:#FAF7F0;
  --popover-foreground:#0A43ED;
  --primary:#0A43ED;
  --primary-foreground:#FAF7F0;
  --secondary:#FAF7F0;
  --secondary-foreground:#0A43ED;
  --muted:#FAF7F0;
  --muted-foreground:#0A43ED;
  --accent:#0A43ED;
  --accent-foreground:#FAF7F0;
  --border:#0A43ED;
  --input:#0A43ED;
  --ring:#0A43ED;
  --nexa-navy:#0A43ED;
  --nexa-lavender:#0A43ED;
  --nexa-lavender-2:#FAF7F0;
  --nexa-lavender-3:#0A43ED;
  --nexa-accent:#FAF7F0;
  --nexa-blue:#0A43ED;
  --nexa-chip:#FAF7F0;
  --nexa-card-dark:#0A43ED;
  --nexa-badge:#0A43ED;
  --nexa-grad-a:#0A43ED;
  --nexa-grad-b:#0A43ED;
  --nexa-grad-line:#0A43ED;
  background:#FAF7F0;
  color:#0A43ED;
}
.nexacore .nexa-grad-text{
  background-image:none!important;
  color:#0A43ED!important;
  -webkit-text-fill-color:#0A43ED!important;
}
.nexacore [data-slot="trusted"] .nexa-grad-text{
  color:#FAF7F0!important;
  -webkit-text-fill-color:#FAF7F0!important;
}
.nexacore .nexa-grad-a-bg{background:#0A43ED}
.nexacore .nexa-grad-line-bg{background:#0A43ED}
.nexacore .nexa-soft-shadow{box-shadow:none}
.nexacore .nexa-blur-card{backdrop-filter:none}
.nexacore [data-slot="navbar"] nav{
  background:#FAF7F0!important;
  color:#0A43ED;
  border:1px solid #0A43ED;
  box-shadow:none;
}
.nexacore .nexa-section-cream{background:#FAF7F0}
.nexacore .nexa-hero-blue-wash{background:rgba(10,67,237,.86)!important}
.nexacore [data-slot="hero"] video{filter:grayscale(1) contrast(1.06);opacity:.65}
.nexacore [data-slot="freedom"] .nexa-video-blue-wash{background:#0A43ED}
.nexacore [data-slot="freedom"] .nexa-video-blue-wash video{filter:grayscale(1)}
.nexacore [data-slot="freedom"] .nexa-video-blue-wash::after{
 content:"";position:absolute;inset:0;pointer-events:none;border-radius:50%;
 background:rgba(10,67,237,.58);mix-blend-mode:multiply;
}
.nexacore [data-slot="freedom"] .nexa-soft-shadow{
 border:1px solid #0A43ED;
 background:#FAF7F0;
}
.nexacore [data-slot="trusted"] .nexa-blur-card{border:1px solid #FAF7F0}
\`;

export function NexacoreStyles() {
 return <style dangerouslySetInnerHTML={{__html:NEXACORE_CSS}}/>;
}
