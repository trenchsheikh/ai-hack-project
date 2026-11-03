// src/components/ui/gradient-card-demo.tsx
// Adapted demonstration content for this AI learning and challenge platform.
import { GradientCard } from "@/components/ui/gradient-card";

const cardData = [
  {
    badgeText: "Start here",
    badgeColor: "#2563EB",
    title: "Learn AI fundamentals",
    description: "Understand the essentials and try your first useful prompt.",
    ctaText: "Explore lessons",
    ctaHref: "/app/learn",
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=760&q=80",
    gradient: "blue" as const,
  },
  {
    badgeText: "Sports & AI",
    badgeColor: "#3C95D1",
    title: "Football and AI",
    description: "Explore how AI can support the next generation of grassroots sport.",
    ctaText: "Explore the challenge",
    ctaHref: "/app/hackathons/football",
    imageUrl: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=760&q=80",
    gradient: "sky" as const,
  },
  {
    badgeText: "Creative thinking",
    badgeColor: "#71ADD7",
    title: "Creative Futures",
    description: "Use AI to turn an original story or design idea into something tangible.",
    ctaText: "View the brief",
    ctaHref: "/app/hackathons/creative",
    imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=760&q=80",
    gradient: "cream" as const,
  },
  {
    badgeText: "Your workspace",
    badgeColor: "#1E5B9D",
    title: "Build your first project",
    description: "Define a problem, propose a solution and save your idea.",
    ctaText: "Start building",
    ctaHref: "/app/build",
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=760&q=80",
    gradient: "white" as const,
  },
];

export function GradientCardDemo({ onNavigate }: { onNavigate?: (href: string) => void }) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
      {cardData.map((card) => (
        <GradientCard key={card.title} {...card} onNavigate={onNavigate} />
      ))}
    </div>
  );
}

export default GradientCardDemo;
