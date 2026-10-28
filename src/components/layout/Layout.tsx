import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <a
        href="#main-content"
        onClick={(event) => { event.preventDefault(); document.getElementById("main-content")?.focus(); }}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-brand-green-900 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>
      <Header />
      <main tabIndex={-1} id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
