import type { ReactNode } from "react";
import { PageHero } from "./PageHero";

export function LegalPage({ title, path, updated, children }: { title: string; path: string; updated: string; children: ReactNode }) {
  return (
    <>
      <PageHero title={title} description={`Last updated: ${updated}`} crumbs={[{ name: title, path }]} />
      <div className="container-x py-14 md:py-20">
        <article className="prose-content max-w-3xl">{children}</article>
      </div>
    </>
  );
}
