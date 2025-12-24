'use client'

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        if (isSearchOpen) {
          setIsSearchOpen(false);
        }
        if (isExpanded) {
          setIsHamburgerOpen(false);
          const tl = tlRef.current;
          if (tl) {
            tl.eventCallback("onReverseComplete", () => {
              setIsExpanded(false);
              tl.eventCallback("onReverseComplete", null);
            });
            tl.reverse();
          }
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchOpen, isExpanded]);

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
      ref={containerRef}
      className={`card-nav-container mx-auto w-[95%] max-w-[1000px] ${className} ${isExpanded || isSearchOpen ? "rounded-2xl" : "rounded-full"} shadow-md shadow-gray-600 duration-25 ease-in-out fixed top-2 sm:top-5 left-1/2 -translate-x-1/2 z-50`}
      style={{ backgroundColor: baseColor }}
    >
      <nav
        ref={navRef}
        className="card-nav rounded-4xl block h-[60px] p-0 shadow-md relative"
        style={{ backgroundColor: baseColor }}
      >
        <div className="card-nav-top absolute inset-x-0 top-0 h-[60px] flex items-center justify-between p-2 px-2 sm:px-4 z-[2]">
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1 z-[70]"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isHamburgerOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isHamburgerOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isHamburgerOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex gap-2 lg:gap-3">
            <Link href="/" className="px-3 lg:px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-200 font-medium text-xs lg:text-sm border border-white/30">
              All Languages
            </Link>
            <Link href="/LibraryPage" className="px-3 lg:px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-200 font-medium text-xs lg:text-sm border border-white/30">
              All Libraries
            </Link>
          </div>

          {/* Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 logo-container flex items-center">
            <Link href="/" className="flex items-center text-white hover:text-cyan-300 font-semibold text-lg sm:text-xl transition-colors duration-200">
              <span className="hidden sm:inline">Tech Libraries</span>
              <span className="sm:hidden">TL</span>
            </Link>
          </div>

          {/* Search - Desktop */}
          <div className="hidden sm:block relative z-[60]">
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
              className="pl-10 pr-4 py-2 rounded-full border-2 border-white/30 focus:border-cyan-500 focus:outline-none text-white placeholder-white w-48 lg:w-64"
            />
            {showResults && searchQuery.trim() && searchResults.length > 0 && (
              <div className="absolute mt-2 w-48 lg:w-64 bg-white rounded-lg shadow-2xl border-2 border-gray-300 max-h-60 overflow-y-auto z-[70]">
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

          {/* Search Icon - Mobile */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="sm:hidden p-2 text-white hover:text-cyan-300 transition-colors"
            aria-label="Toggle search"
          >
            <FiSearch size={20} />
          </button>
        </div>

        {/* Mobile Menu Content */}
        {isExpanded && (
          <div className="card-nav-content md:hidden absolute top-[60px] left-0 right-0 p-4 space-y-4" style={{ backgroundColor: baseColor }}>
            <div className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full transition-all duration-200 font-medium text-center"
                onClick={() => setIsExpanded(false)}
              >
                All Languages
              </Link>
              <Link 
                href="/LibraryPage" 
                className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full transition-all duration-200 font-medium text-center"
                onClick={() => setIsExpanded(false)}
              >
                All Libraries
              </Link>
            </div>
          </div>
        )}

        {/* Mobile Search Overlay */}
        {isSearchOpen && (
          <div className="sm:hidden absolute top-[60px] left-0 right-0 p-4" style={{ backgroundColor: baseColor }}>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search languages..."
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
                      setIsSearchOpen(false);
                    } else {
                      router.push(`/LibraryPage?search=${encodeURIComponent(query)}`);
                      setSearchQuery("");
                      setShowResults(false);
                      setIsSearchOpen(false);
                    }
                  }
                }}
                className="w-full pl-10 pr-4 py-3 rounded-full border-2 border-gray-300 focus:border-cyan-500 focus:outline-none text-gray-800 placeholder-gray-400"
                autoFocus
              />
            </div>
            {showResults && searchQuery.trim() && searchResults.length > 0 && (
              <div className="mt-2 bg-gray-50 rounded-lg max-h-48 overflow-y-auto">
                {searchResults.map((result) => (
                  <div
                    key={result.id}
                    onClick={() => {
                      router.push(`/LanguagePage/${result.id}`);
                      setSearchQuery("");
                      setSearchResults([]);
                      setShowResults(false);
                      setIsSearchOpen(false);
                    }}
                    className="block px-4 py-3 text-gray-800 hover:bg-gray-100 cursor-pointer transition-colors border-b border-gray-200 last:border-b-0"
                  >
                    {result.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default CardNav;
