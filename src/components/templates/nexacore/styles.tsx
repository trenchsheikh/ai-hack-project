const NEXACORE_CSS = `
/* Strict two-colour visual system for Fhilo's PUBLIC landing page only. */
.nexacore {
 --nexa-blue:#0A43ED;
 --nexa-cream:#FAF7F0;
 --background:#FAF7F0;
 --foreground:#0A43ED;
 --primary:#0A43ED;
 --primary-foreground:#FAF7F0;
 --border:#0A43ED;
 --card:#FAF7F0;
 --card-foreground:#0A43ED;
 --ring:#0A43ED;
 background:#FAF7F0;
 color:#0A43ED;
}
.nexacore a,.nexacore button{transition:background-color .2s,color .2s,border-color .2s}
.nexacore :focus-visible{outline:2px solid #0A43ED;outline-offset:4px}
.nexacore .nexa-primary-action:focus-visible,
.nexacore .nexa-nav-join:focus-visible,
.nexacore .nexa-closing .nexa-text-action:focus-visible{outline-color:#FAF7F0}
`;

export function NexacoreStyles(){
 return <style dangerouslySetInnerHTML={{__html:NEXACORE_CSS}}/>;
}
