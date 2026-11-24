import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";
import { buttonClass } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-display text-8xl font-extrabold text-border">404</p>
      <h1 className="mt-4 text-3xl font-bold md:text-4xl">Page not found</h1>
      <p className="mt-3 max-w-md text-muted">The page you are looking for may have moved. Let&apos;s get you back on track.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className={buttonClass("primary", "md")}>
          <Home className="h-4 w-4" /> Back to Home
        </Link>
        <Link href="/services" className={buttonClass("outline", "md")}>
          Explore Services <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
