"use client";
import * as React from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrolled } from "./primitives";

const NAV_LINKS = [
 { label: "Why Fhilo", href: "#why" },
 { label: "How it works", href: "#method" },
 { label: "For organisations", href: "/organisations" },
];

export function Navbar() {
  const scrolled = useScrolled(48);
  const [open, setOpen] = React.useState(false);
  return (
    <header data-slot="navbar" className="fixed inset-x-0 top-4 z-50 flex justify-center ps-4 pe-4">
      <nav className={cn("w-full rounded-2xl bg-white shadow-lg transition-[max-width] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",scrolled?"max-w-[68rem]":"max-w-6xl")}>
        <div className="flex items-center justify-between gap-4 ps-5 pe-3 py-2">
          <a href="/" className="nexa-brand flex shrink-0 items-center gap-2 whitespace-nowrap" aria-label="Fhilo home">
            <img src="/favicon.svg" alt="" width={30} height={30}/>
            <span>fhilo<span className="nexa-logo-dot">.</span></span>
          </a>
          <div className="hidden shrink-0 items-center gap-1 lg:flex">
            {NAV_LINKS.map(link=><a key={link.label} href={link.href} className="shrink-0 whitespace-nowrap rounded-xl px-3 py-2 text-sm text-[var(--nexa-navy)] transition-colors duration-300 hover:bg-foreground/5">{link.label}</a>)}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <a href="/app" className="nexa-nav-preview hidden sm:inline-flex">Explore platform</a>
            <a href="/waitlist" className="nexa-nav-join hidden lg:inline-flex">Join waitlist <ArrowUpRight size={16}/></a>
            <button type="button" aria-label={open?"Close menu":"Open menu"} aria-expanded={open}
              onClick={()=>setOpen(v=>!v)} className="flex h-10 w-10 items-center justify-center rounded-xl text-[var(--nexa-navy)] transition-colors hover:bg-foreground/5 lg:hidden">
              {open?<X size={20}/>:<Menu size={20}/>}
            </button>
          </div>
        </div>
        {open&&<div className="flex flex-col gap-1 border-t border-border px-4 pb-4 pt-2 lg:hidden">
          {NAV_LINKS.map(link=><a key={link.label} href={link.href} onClick={()=>setOpen(false)} className="w-full rounded-xl px-3 py-3 text-sm text-[var(--nexa-navy)] hover:bg-foreground/5">{link.label}</a>)}
          <a href="/waitlist" className="nexa-nav-join mt-2 text-center">Join the waitlist <ArrowUpRight size={16}/></a>
        </div>}
      </nav>
    </header>
  );
}
