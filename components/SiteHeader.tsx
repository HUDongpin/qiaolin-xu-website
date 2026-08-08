"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CV_HREF, navigation, SITE_NAME } from "@/lib/site";

function RouteLink({ href, label, onNavigate }: { href: string; label: string; onNavigate?: () => void }) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link className="nav-link" href={href} aria-current={active ? "page" : undefined} onClick={onNavigate}>
      {label}
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <nav className="site-nav container" aria-label="Primary navigation">
        <Link
          className="brand"
          href="/"
          aria-current={pathname === "/" ? "page" : undefined}
          onClick={() => setMenuOpen(false)}
        >
          {SITE_NAME}
        </Link>

        <div className="desktop-nav">
          {navigation.map((item) => (
            <RouteLink key={item.href} {...item} />
          ))}
          <a className="nav-download" href={CV_HREF} download>
            Download CV
          </a>
        </div>

        <button
          ref={menuButtonRef}
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Menu, open navigation"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </nav>

      <div className="mobile-nav-shell" id="mobile-navigation" hidden={!menuOpen}>
        <div className="mobile-nav container">
          {navigation.map((item) => (
            <RouteLink key={item.href} {...item} onNavigate={() => setMenuOpen(false)} />
          ))}
          <a
            className="nav-download mobile-download"
            href={CV_HREF}
            download
            onClick={() => setMenuOpen(false)}
          >
            Download CV
          </a>
        </div>
      </div>
    </header>
  );
}
