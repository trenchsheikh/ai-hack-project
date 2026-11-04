import React from "react";
export function BrandMark({size=36,className=""}){
 return <svg className={className} width={size} height={size} viewBox="0 0 80 80" fill="none" aria-hidden="true">
  <path d="M40 5C29 6 25 22 17 27C14 29 11 30 8 30C18 30 29 33 35 39C40 30 47 23 47 8C47 6 45 5 40 5Z" fill="#0A43ED"/>
  <path d="M48 20C47 31 52 38 60 42C65 45 72 46 73 52C68 58 54 54 47 50C41 46 38 42 39 37C44 32 45 27 48 20Z" fill="#0A43ED"/>
  <path d="M72 51C59 50 50 56 44 65C41 70 39 75 34 76C27 71 33 59 37 52C42 44 46 43 50 43C56 47 63 49 72 51Z" fill="#0A43ED"/>
  <path d="M32 61C31 53 25 50 18 47C13 44 7 44 6 38C7 32 17 33 24 36C33 40 37 46 37 50C35 55 33 58 32 61Z" fill="#0A43ED"/>
 </svg>;
}
export function Brand({size=35,compact=false,light=false}){
 return <span className={"fh-brand"+(light?" fh-brand-light":"")}><BrandMark size={size}/>{!compact&&<span>fhilo<span className="fh-dot">.</span></span>}</span>;
}
