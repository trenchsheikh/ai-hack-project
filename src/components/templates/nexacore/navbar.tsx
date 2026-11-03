"use client";

import * as React from "react";
import { Menu, Search, X } from "lucide-react";

import { cn } from "@/lib/utils";

import { ContactButton, Logo, useScrolled } from "./primitives";

const NAV_LINKS = [
  { label: "Explore the Platform", href: "#build" },
  { label: "How It Works", href: "#method" },
  { label: "Start Learning", href: "/app/learn" },
  { label: "Our Approach", href: "#thinking" },
];

export function Navbar() {
  const scrolled = useScrolled(48);
  const [open, setOpen] = React.useState(false);

  return (
    <header
      data-slot="navbar"
      className="fixed inset-x-0 top-4 z-50 flex justify-center ps-4 pe-1.5"
    >
      <nav
        className={cn(
          "w-full rounded-2xl bg-white shadow-lg transition-[max-width] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
          scrolled ? "max-w-[68rem]" : "max-w-6xl",
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between gap-4 ps-5 pe-3 py-1.5",
          )}
        >
          <a href="#home" className="flex shrink-0 items-center gap-2 whitespace-nowrap">
            <Logo />
            <span
              className="font-medium text-[var(--nexa-navy)]"
              style={{ fontSize: 22, letterSpacing: "-0.02em" }}
            >
              AI Lab
            </span>
          </a>

          <div
            className={cn(
              "hidden shrink-0 items-center gap-1 lg:flex",
            )}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={cn(
                  "shrink-0 whitespace-nowrap rounded-xl px-3 py-2 text-sm text-[var(--nexa-navy)] transition-colors duration-300 hover:bg-foreground/5",
                )}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              aria-label="Search lessons" onClick={() => window.location.assign("/app/learn")}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-[var(--nexa-navy)] transition-colors hover:bg-foreground/5"
            >
              <Search size={20} />
            </button>
            <div className="hidden lg:block">
              <ContactButton />
            </div>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-[var(--nexa-navy)] transition-colors hover:bg-foreground/5 lg:hidden"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {open ? (
          <div className="flex flex-col items-center gap-1 border-t border-border px-4 pb-3 pt-2 lg:hidden">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="w-full rounded-xl py-2 text-center text-sm text-[var(--nexa-navy)] transition-colors hover:bg-foreground/5"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-1 flex w-full items-center gap-2">
              <button
                type="button"
                aria-label="Search"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[var(--nexa-navy)] transition-colors hover:bg-foreground/5"
              >
                <Search size={20} />
              </button>
              <ContactButton className="flex-1" />
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
