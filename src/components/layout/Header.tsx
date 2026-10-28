import { useCallback, useEffect, useState } from "react";
import { Link, useRouter } from "@/router/router";
import { HeaderBrand } from "@/components/layout/HeaderBrand";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Primitives";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { SearchOverlay } from "@/components/layout/SearchOverlay";

export function Header() {
  const { path } = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const openSearch = useCallback(() => { setMenuOpen(false); setSearchOpen(true); }, []);

  useEffect(() => { setMenuOpen(false); }, [path]);

  return <header className="sticky top-0 z-40 bg-white shadow-sm">
    <Container className="flex h-18 items-center justify-between gap-3 py-3 lg:h-24">
      <HeaderBrand />
      <div className="flex shrink-0 items-center gap-2 sm:gap-4 lg:gap-7">
        <button type="button" onClick={openSearch} className="focus-ring flex h-11 w-11 items-center justify-center rounded-full text-brand-green-900 hover:bg-brand-green-100" aria-label="Open search">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5" strokeLinecap="round"/></svg>
        </button>
        <Link to="/admissions/connect-with-admissions" className="focus-ring hidden text-sm font-bold uppercase tracking-wide text-brand-green-900 hover:underline md:block">Request Info</Link>
        <LinkButton to="/admissions/how-to-apply" variant="solid-green" size="sm" className="hidden sm:inline-flex">Apply Now</LinkButton>
        <button type="button" onClick={() => setMenuOpen(true)} className="focus-ring flex h-11 items-center gap-2 px-2 text-sm font-bold uppercase text-ink" aria-label="Menu" aria-haspopup="dialog" aria-expanded={menuOpen} aria-controls="site-menu">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round"/></svg><span className="hidden min-[400px]:inline">Menu</span>
        </button>
      </div>
    </Container>
    <MobileMenu open={menuOpen} onClose={closeMenu} onSearch={openSearch} />
    <SearchOverlay open={searchOpen} onClose={closeSearch} />
  </header>;
}
