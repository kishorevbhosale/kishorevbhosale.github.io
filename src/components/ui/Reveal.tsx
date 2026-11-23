import type { CSSProperties, ReactNode } from "react";

/** Fade-up on scroll. Animated by <RevealObserver />; content stays visible without JS or with reduced motion. */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li";
}) {
  return (
    <Tag data-reveal="" className={className} style={delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined}>
      {children}
    </Tag>
  );
}
