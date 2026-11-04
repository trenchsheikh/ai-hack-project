import React from "react";

/**
 * Keep the Studio navigation usable even if a future UI component throws.
 * This is a frontend error boundary, independent of any backend or AI setup.
 */
export default class StudioErrorBoundary extends React.Component {
 constructor(props){
  super(props);
  this.state={failed:false};
 }
 static getDerivedStateFromError(){
  return {failed:true};
 }
 componentDidCatch(error,info){
  console.error("Fhilo Studio failed to render",error,info);
 }
 render(){
  if(this.state.failed){
   return <section className="f-content" role="alert">
    <div className="f-panel" style={{maxWidth:680,margin:"35px auto"}}>
     <span className="f-eyebrow">FHILO STUDIO</span>
     <h1 style={{margin:"15px 0 8px"}}>We couldn't open this workspace.</h1>
     <p>Your projects are stored in this browser. Try reopening Studio; no backend connection is required to view the interface.</p>
     <div style={{display:"flex",gap:12,flexWrap:"wrap",marginTop:24}}>
      <a className="f-btn" href="/app/studio">Open Studio</a>
      <a className="f-btn outline" href="/app/projects">My projects</a>
     </div>
    </div>
   </section>;
  }
  return this.props.children;
 }
}
