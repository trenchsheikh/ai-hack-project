const NEXACORE_CSS = `
.nexacore {
  --background: #FAF7F0;
  --nexa-cream: #FAF7F0;
  --nexa-cream-deep: #F3EEE2;
  --nexa-sky: #EAF4FC;
  --nexa-royal: #2563EB;
  --foreground: rgb(22, 57, 90);
  --card: #ffffff;
  --card-foreground: rgb(22, 57, 90);
  --popover: #ffffff;
  --popover-foreground: rgb(22, 57, 90);
  --primary: rgb(37, 99, 235);
  --primary-foreground: #ffffff;
  --secondary: rgb(238, 246, 252);
  --secondary-foreground: rgb(22, 57, 90);
  --muted: rgb(245, 248, 252);
  --muted-foreground: rgb(102, 128, 154);
  --accent: rgb(237, 246, 252);
  --accent-foreground: rgb(22, 57, 90);
  --border: rgb(218, 232, 245);
  --input: rgb(218, 232, 245);
  --ring: rgb(37, 99, 235);
  --nexa-navy: rgb(22, 57, 90);
  --nexa-lavender: rgb(177, 213, 237);
  --nexa-lavender-2: rgb(211, 229, 243);
  --nexa-lavender-3: rgb(105, 132, 155);
  --nexa-accent: rgb(101, 190, 246);
  --nexa-blue: rgb(37, 99, 235);
  --nexa-chip: rgb(245, 241, 232);
  --nexa-card-dark: rgba(13, 43, 74, 0.92);
  --nexa-badge: rgb(26, 70, 109);
  --nexa-grad-a: linear-gradient(100deg, #245bc2, #3b82e4 52%, #a4d5f5);
  --nexa-grad-b: linear-gradient(100deg, #245bc2, #2883c7 56%, #1a669b);
  --nexa-grad-line: linear-gradient(to bottom, #2563eb 0%, #5aa9e9 30%, #a8d6f3 56%, #d8eaf5 78%, rgba(224, 238, 247, 0) 100%);
}
.nexacore .nexa-grad-text {
  background-image: var(--nexa-grad-b);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}
.nexacore .nexa-grad-a-bg {
  background-image: var(--nexa-grad-a);
}
.nexacore .nexa-grad-line-bg {
  background-image: var(--nexa-grad-line);
}
.nexacore .nexa-soft-shadow {
  box-shadow: 0 3px 9.1px rgba(63, 74, 126, 0.05), 0 1px 29px rgba(63, 74, 126, 0.1);
}
.nexacore .nexa-blur-card {
  backdrop-filter: blur(36px);
  -webkit-backdrop-filter: blur(36px);
}
/* Only the public landing page receives this palette; /app stays as-is. */
.nexacore { background: var(--nexa-cream); color: var(--nexa-navy); }
.nexacore [data-slot="navbar"] nav {
  background: rgba(255, 255, 255, .96);
  border: 1px solid #e3edf6;
  box-shadow: 0 12px 36px rgba(20, 58, 100, .11);
}
.nexacore .nexa-section-cream { background: var(--nexa-cream); }
.nexacore .nexa-hero-blue-wash {
  background: linear-gradient(118deg, rgba(8,36,67,.60) 0%, rgba(16,72,124,.42) 48%, rgba(15,65,117,.45) 100%);
}
.nexacore [data-slot="hero"] .nexa-grad-text,
.nexacore [data-slot="trusted"] .nexa-grad-text {
  background-image: linear-gradient(100deg, #a9dfff 4%, #83c9f9 52%, #f6e9c9 100%);
}
.nexacore [data-slot="hero"] video {
  filter: saturate(.82);
}
.nexacore [data-slot="freedom"] .nexa-video-blue-wash::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: 50%;
  background: rgba(61, 127, 188, .22);
  mix-blend-mode: color;
}
.nexacore [data-slot="freedom"] .nexa-soft-shadow {
  border: 1px solid rgba(215, 229, 240, .75);
}
.nexacore [data-slot="precision"] .nexa-grad-text {
  background-image: linear-gradient(100deg, #2866b2, #328bc8 63%, #1f568a);
}
.nexacore .nexa-soft-shadow {
  box-shadow: 0 3px 9px rgba(35, 73, 116, 0.04), 0 2px 23px rgba(35, 73, 116, 0.08);
}
`;

export function NexacoreStyles() {
  return <style dangerouslySetInnerHTML={{ __html: NEXACORE_CSS }} />;
}
