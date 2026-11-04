"use client";
import * as React from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useScrolled } from "./primitives";

const NAV_LINKS = [
 { label: "Why Fhilo", href: "#why" },
 { label: "How it works", href: "#method" },
 { label: "For organisations", href: "/organisations" },
];

export function Navbar() {
 const scrolled=useScrolled(48);
 const [open,setOpen]=React.useState(false);
 return (
  <header data-slot="navbar" className="nexa-navigation">
   <nav className={"nexa-navigation-inner"+(scrolled?" is-scrolled":"")} aria-label="Main navigation">
    <a href="/" className="nexa-brand" aria-label="Fhilo home">
      <img src="/favicon.svg" alt="" width={30} height={30}/>
      <span>fhilo<span className="nexa-logo-dot">.</span></span>
    </a>
    <div className="nexa-navigation-links">
      {NAV_LINKS.map(link=><a key={link.label} href={link.href}>{link.label}</a>)}
    </div>
    <div className="nexa-navigation-actions">
      <a href="/app" className="nexa-nav-preview">Explore platform</a>
      <a href="/waitlist" className="nexa-nav-join">Join waitlist <ArrowUpRight size={16}/></a>
      <button className="nexa-menu-toggle" aria-label={open?"Close menu":"Open menu"} aria-expanded={open} type="button" onClick={()=>setOpen(v=>!v)}>{open?<X size={20}/>:<Menu size={20}/>}</button>
    </div>
    {open&&<div className="nexa-navigation-mobile">
      {NAV_LINKS.map(link=><a key={link.label} href={link.href} onClick={()=>setOpen(false)}>{link.label}</a>)}
      <a href="/app" onClick={()=>setOpen(false)}>Explore platform</a>
      <a href="/waitlist" onClick={()=>setOpen(false)} className="nexa-nav-join">Join waitlist <ArrowUpRight size={16}/></a>
    </div>}
   </nav>
  </header>
 );
}
