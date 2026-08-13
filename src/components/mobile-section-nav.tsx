"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type NavItem = {
  label: string;
  href: string;
  linkHref?: string;
};

export function MobileSectionNav({ items }: { items: NavItem[] }) {
  const sectionHrefs = useMemo(
    () => items.map((item) => item.href).filter((href) => href.startsWith("#")),
    [items],
  );
  const [activeHref, setActiveHref] = useState(sectionHrefs[0] ?? "");
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    let frameId = 0;

    const updateActiveSection = () => {
      const offset = 150;
      let nextHref = sectionHrefs[0] ?? "";

      for (const href of sectionHrefs) {
        const section = document.getElementById(href.slice(1));

        if (section && section.getBoundingClientRect().top <= offset) {
          nextHref = href;
        }
      }

      setActiveHref(nextHref);
    };

    const onScroll = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sectionHrefs]);

  useEffect(() => {
    linkRefs.current[activeHref]?.scrollIntoView({
      block: "nearest",
      inline: "center",
      behavior: "smooth",
    });
  }, [activeHref]);

  return (
    <nav
      aria-label="Mobile navigation"
      className="flex gap-2 overflow-x-auto border-t border-neutral-100 px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-neutral-700 lg:hidden"
    >
      {items.map((item) => {
        const linkHref = item.linkHref ?? item.href;
        const isExternal = linkHref.startsWith("http");
        const isActive = activeHref === item.href;

        return (
          <a
            key={item.href}
            ref={(node) => {
              linkRefs.current[item.href] = node;
            }}
            href={linkHref}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noreferrer" : undefined}
            aria-current={isActive ? "location" : undefined}
            className={`shrink-0 rounded-full px-3 py-2 transition ${
              isActive
                ? "bg-[#c91522] text-white shadow-sm"
                : "hover:bg-neutral-100 hover:text-[#c91522]"
            }`}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
