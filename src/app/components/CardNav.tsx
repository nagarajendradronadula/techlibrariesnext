'use client'

import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";

type CardNavLink = {
  label: string;
  href: string;
  ariaLabel: string;
};

export type CardNavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
};

type LanguageData = {
  id: string;
  name: string;
  logo: string;
};

export interface CardNavProps {
  logo: string;
  logoAlt?: string;
  items: CardNavItem[];
  languageData?: LanguageData[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
}

const CardNav: React.FC<CardNavProps> = ({
  items,
  languageData = [],
  className = "",
  ease = "power3.out",
  baseColor = "#fff",
  menuColor,
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | HTMLAnchorElement)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 400;

    if (typeof window === "undefined") return 400;
    
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      const contentEl = navEl.querySelector(".card-nav-content") as HTMLElement;
      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;

        contentEl.style.visibility = "visible";
        contentEl.style.pointerEvents = "auto";
        contentEl.style.position = "static";
        contentEl.style.height = "auto";

        const topBar = 60;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = wasVisible;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;

        return topBar + contentHeight + padding;
      }
    }
    return 450;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 60, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease,
    });

    tl.to(
      cardsRef.current,
      { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 },
      "-=0.1"
    );

    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, [ease, items]);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!tlRef.current) return;

        if (isExpanded) {
          const newHeight = calculateHeight();
          gsap.set(navRef.current, { height: newHeight });

          tlRef.current.kill();
          const newTl = createTimeline();
          if (newTl) {
            newTl.progress(1);
            tlRef.current = newTl;
          }
        } else {
          tlRef.current.kill();
          const newTl = createTimeline();
          if (newTl) {
            tlRef.current = newTl;
          }
        }
      }, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      if (isSearchOpen) {
        setIsSearchOpen(false);
      }
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback("onReverseComplete", () => {
        setIsExpanded(false);
        tl.eventCallback("onReverseComplete", null);
      });
      tl.reverse();
    }
  };



  return (
    <div
      className={` bg-white card-nav-container mx-auto w-[95%] max-w-[1000px] ${className} ${isExpanded || isSearchOpen ? "rounded-4xl" : "rounded-full"} shadow-md shadow-gray-600 duration-25 ease-in-out fixed top-5 left-1/2 -translate-x-1/2 z-50`}
    >
      <nav
        ref={navRef}
        className="card-nav rounded-full block h-[60px] p-0 shadow-md relative"
        style={{ backgroundColor: baseColor }}
      >
        <div className="card-nav-top absolute inset-x-0 top-0 h-[60px] flex items-center justify-between p-2 px-4 z-[2]">
          <div className="flex gap-3">
            <Link href="/" className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-200 font-medium text-sm border border-white/30">
              All Languages
            </Link>
            <Link href="/LibraryPage" className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-200 font-medium text-sm border border-white/30">
              All Libraries
            </Link>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 logo-container flex items-center">
            <Link href="/" className="flex items-center text-white hover:text-cyan-300 font-semibold text-xl transition-colors duration-200">
              Tech Libraries
            </Link>
          </div>

          <div className="relative z-[60]">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white" size={20} />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => {
                const value = e.target.value;
                setSearchQuery(value);
                if (value.trim()) {
                  const query = value.toLowerCase();
                  const results = languageData.filter(lang => 
                    lang.name.toLowerCase().includes(query) || 
                    lang.id.toLowerCase().includes(query)
                  );
                  setSearchResults(results);
                  setShowResults(true);
                } else {
                  setShowResults(false);
                  setSearchResults([]);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchQuery.trim()) {
                  const query = searchQuery.toLowerCase().trim();
                  const language = languageData.find(lang => lang.name.toLowerCase() === query || lang.id.toLowerCase() === query);
                  if (language) {
                    router.push(`/LanguagePage/${language.id}`);
                    setSearchQuery("");
                    setShowResults(false);
                  } else {
                    router.push(`/LibraryPage?search=${encodeURIComponent(query)}`);
                    setSearchQuery("");
                    setShowResults(false);
                  }
                }
              }}
              className="pl-10 pr-4 py-2 rounded-full border-2 border-white/30 focus:border-cyan-500 focus:outline-none text-white placeholder-white w-64"
            />
            {showResults && searchQuery.trim() && searchResults.length > 0 && (
              <div className="fixed mt-14 w-64 bg-white rounded-lg shadow-2xl border-2 border-gray-300 max-h-60 overflow-y-auto z-[70]">
                {searchResults.map((result) => (
                  <div
                    key={result.id}
                    onClick={() => {
                      router.push(`/LanguagePage/${result.id}`);
                      setSearchQuery("");
                      setSearchResults([]);
                      setShowResults(false);
                    }}
                    className="block px-4 py-3 text-gray-800 hover:bg-gray-100 cursor-pointer transition-colors border-b border-gray-200 last:border-b-0"
                  >
                    {result.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
