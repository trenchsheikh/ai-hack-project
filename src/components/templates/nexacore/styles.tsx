const NEXACORE_CSS = `
/* Two-colour re-skin of the original landing design; layouts and media remain intact. */
.nexacore {
  --background:#FAF7F0;
  --nexa-cream:#FAF7F0;
  --nexa-cream-deep:#FAF7F0;
  --nexa-sky:#FAF7F0;
  --nexa-royal:#45647D;
  --foreground:#45647D;
  --card:#FAF7F0;
  --card-foreground:#45647D;
  --popover:#FAF7F0;
  --popover-foreground:#45647D;
  --primary:#45647D;
  --primary-foreground:#FAF7F0;
  --secondary:#FAF7F0;
  --secondary-foreground:#45647D;
  --muted:#FAF7F0;
  --muted-foreground:#45647D;
  --accent:#45647D;
  --accent-foreground:#FAF7F0;
  --border:#45647D;
  --input:#45647D;
  --ring:#45647D;
  --nexa-navy:#45647D;
  --nexa-lavender:#45647D;
  --nexa-lavender-2:#FAF7F0;
  --nexa-lavender-3:#45647D;
  --nexa-accent:#FAF7F0;
  --nexa-blue:#45647D;
  --nexa-chip:#FAF7F0;
  --nexa-card-dark:#45647D;
  --nexa-badge:#45647D;
  --nexa-grad-a:#45647D;
  --nexa-grad-b:#45647D;
  --nexa-grad-line:#45647D;
  background:#FAF7F0;
  color:#45647D;
}
.nexacore .nexa-grad-text{
  background-image:none!important;
  color:#45647D!important;
  -webkit-text-fill-color:#45647D!important;
}
.nexacore [data-slot="trusted"] .nexa-grad-text{
  color:#45647D!important;
  -webkit-text-fill-color:#45647D!important;
}
.nexacore .nexa-grad-a-bg{background:#45647D}
.nexacore .nexa-grad-line-bg{background:#45647D}
.nexacore .nexa-soft-shadow{box-shadow:none}
.nexacore .nexa-blur-card{backdrop-filter:none}
.nexacore [data-slot="navbar"] nav{
  background:#FAF7F0!important;
  color:#45647D;
  border:1px solid #45647D;
  box-shadow:none;
}
.nexacore .nexa-section-cream{background:#FAF7F0}
.nexacore .nexa-hero-blue-wash{background:rgba(69, 100, 125, .86)!important}
.nexacore [data-slot="hero"] video{filter:grayscale(1) contrast(1.06);opacity:.65}
.nexacore [data-slot="freedom"] .nexa-video-blue-wash{background:#45647D}
.nexacore [data-slot="freedom"] .nexa-video-blue-wash video{filter:grayscale(1)}
.nexacore [data-slot="freedom"] .nexa-video-blue-wash::after{
 content:"";position:absolute;inset:0;pointer-events:none;border-radius:50%;
 background:rgba(69, 100, 125, .58);mix-blend-mode:multiply;
}
.nexacore [data-slot="freedom"] .nexa-soft-shadow{
 border:1px solid #45647D;
 background:#FAF7F0;
}
.nexacore [data-slot="trusted"] .nexa-blur-card{border:1px solid #FAF7F0}
`;

export function NexacoreStyles() {
 return <style dangerouslySetInnerHTML={{__html:NEXACORE_CSS}}/>;
}
