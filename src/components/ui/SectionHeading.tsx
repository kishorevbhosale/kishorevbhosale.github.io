import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
  as?: "h1" | "h2";
}) {
  return (
    <Reveal className={`mb-10 md:mb-14 ${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <Tag className={`text-3xl leading-tight font-bold md:text-4xl lg:text-[2.75rem] ${light ? "text-white" : ""}`}>{title}</Tag>
      {description && <p className={`mt-4 text-base leading-relaxed md:text-lg ${light ? "text-white/75" : "text-muted"}`}>{description}</p>}
    </Reveal>
  );
}
