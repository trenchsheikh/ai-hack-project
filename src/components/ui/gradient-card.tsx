// src/components/ui/gradient-card.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

export const cardVariants = cva(
  "relative isolate flex h-full min-h-[326px] w-full flex-col justify-between overflow-hidden rounded-2xl p-7 shadow-sm transition-shadow duration-300 hover:shadow-lg sm:p-8",
  {
    variants: {
      gradient: {
        orange: "bg-gradient-to-br from-orange-100 via-rose-50 to-amber-200/60",
        gray: "bg-gradient-to-br from-slate-100 via-indigo-50 to-blue-200/60",
        purple: "bg-gradient-to-br from-purple-100 via-violet-50 to-indigo-200/70",
        green: "bg-gradient-to-br from-emerald-100 via-lime-50 to-teal-200/60",
      },
    },
    defaultVariants: { gradient: "purple" },
  },
);

export interface GradientCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  badgeText: string;
  badgeColor: string;
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  imageUrl: string;
  /** Retain client-side navigation and browser back/forward history. */
  onNavigate?: (href: string) => void;
}

const cardAnimation: Variants = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.018, y: -5, transition: { type: "spring", stiffness: 250, damping: 23 } },
};
const imageAnimation: Variants = {
  rest: { scale: 1, rotate: 0 },
  hover: { scale: 1.075, rotate: 2, transition: { type: "spring", stiffness: 280, damping: 23 } },
};

export const GradientCard = React.forwardRef<HTMLDivElement, GradientCardProps>(
  ({ className, gradient, badgeText, badgeColor, title, description, ctaText, ctaHref, imageUrl, onNavigate, ...props }, ref) => {
    const reduceMotion = useReducedMotion();
    return (
      <motion.div
        ref={ref}
        initial="rest"
        animate="rest"
        whileHover={reduceMotion ? undefined : "hover"}
        whileFocus={reduceMotion ? undefined : "hover"}
        variants={reduceMotion ? undefined : cardAnimation}
        className="h-full"
      >
        <div className={cn(cardVariants({ gradient }), "group st-gradient-card", className)} {...props}>
          <motion.img
            src={imageUrl}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            variants={reduceMotion ? undefined : imageAnimation}
            className="pointer-events-none absolute -bottom-[20%] -right-[19%] w-[77%] max-w-none select-none rounded-3xl object-cover opacity-70"
          />
          <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-white/35 via-white/15 to-transparent" />
          <div className="relative z-10 flex h-full flex-col">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 text-xs font-semibold text-foreground/80 backdrop-blur-sm">
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: badgeColor }} />
              {badgeText}
            </div>
            <div className="flex-grow">
              <h3 className="mb-2 max-w-[310px] text-[clamp(21px,2vw,27px)] font-bold leading-tight tracking-tight text-foreground">
                {title}
              </h3>
              <p className="max-w-[295px] text-[13px] leading-relaxed text-foreground/75 sm:text-sm">
                {description}
              </p>
            </div>
            <a
              href={ctaHref}
              className="group/cta mt-9 inline-flex w-fit items-center gap-2 rounded-md py-1 text-sm font-semibold text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600"
              onClick={(event) => {
                if (onNavigate && !event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                  event.preventDefault();
                  onNavigate(ctaHref);
                }
              }}
            >
              {ctaText}
              <ArrowRight size={17} className="transition-transform duration-300 group-hover/cta:translate-x-1" aria-hidden="true" />
            </a>
          </div>
        </div>
      </motion.div>
    );
  },
);
GradientCard.displayName = "GradientCard";
