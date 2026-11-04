import React from "react";
const SHAPES=["M67.5,45.3L62.8,44.8L53.4,45.0L47.2,46.9L43.0,49.5L37.7,55.0L33.1,62.5L30.3,70.5L29.8,73.6L30.3,75.8L32.0,76.7L39.1,76.1L42.2,75.0L45.8,72.8L48.0,70.8L49.8,68.3L54.8,58.4L58.8,52.3L63.4,47.5Z","M3.1,37.0L2.8,39.7L3.8,43.3L5.2,45.9L7.8,48.9L12.8,51.7L22.0,55.0L26.4,57.3L30.0,60.8L31.2,63.3L31.6,63.3L33.1,57.7L33.3,52.0L32.3,48.6L31.1,46.1L28.4,42.8L25.2,40.5L21.1,38.4L14.5,36.4L9.5,35.6L5.0,35.6Z","M49.7,18.0L48.0,23.6L47.7,28.6L49.2,33.9L52.5,38.0L55.3,40.0L58.3,41.6L65.3,44.1L70.6,44.8L75.2,44.8L76.7,43.9L77.2,42.8L77.2,41.1L76.4,38.1L75.2,35.8L73.0,33.3L68.8,30.6L60.2,27.5L55.2,24.8L51.7,21.6Z","M50.3,3.8L49.4,3.0L42.8,3.0L40.9,3.3L38.0,4.2L33.6,6.9L30.9,9.5L29.4,11.9L24.2,22.5L19.7,29.4L16.6,32.5L11.7,35.2L25.6,35.3L28.4,34.8L33.6,33.1L39.5,29.4L44.1,24.8L46.6,21.4L48.6,17.3L50.3,11.1Z"];
export function BrandMark({size=36,className=""}){
 return <svg className={className} width={size} height={size} viewBox="0 0 80 80" fill="none" aria-hidden="true">
  {SHAPES.map((shape,i)=><path key={i} d={shape} fill="#0A43ED"/>)}
 </svg>;
}
export function Brand({size=35,compact=false,light=false}){
 return <span className={"fh-brand"+(light?" fh-brand-light":"")}><BrandMark size={size}/>{!compact&&<span>fhilo<span className="fh-dot">.</span></span>}</span>;
}
