'use client'

import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";
// use your own icon import if react-icons is not available
import { GoArrowUpRight } from "react-icons/go";

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
  logo,
  logoAlt = "Logo",
  items,
  languageData = [],
  className = "",
  ease = "power3.out",
  baseColor = "#fff",
  menuColor,
  buttonBgColor,
  buttonTextColor,
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | HTMLAnchorElement)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    if (typeof window === "undefined") return 260;
    
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
    return 260;
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
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
      tl.reverse();
    }
  };



  return (
    <div
      className={`card-nav-container relative mx-auto w-[95%] max-w-[1000px] z-[99] mt-[1.2em] md:mt-[2em] mb-4 ${className} bg-cyan-100 ${isExpanded ? "rounded-4xl" : "rounded-full"}  shadow-md shadow-gray-400 duration-25 ease-in-out sticky top-10`}
    >
      <nav
        ref={navRef}
        className={`card-nav ${isExpanded ? "open rounded-4xl" : "rounded-full"} block h-[60px] p-0 shadow-md relative overflow-hidden will-change-[height] duration-25 ease-in-out`}
        style={{ backgroundColor: baseColor }}
      >
        <div className="card-nav-top absolute inset-x-0 top-0 h-[60px] flex items-center justify-between p-2 pl-[1.1rem] z-[2]">
          <div
            className={`hamburger-menu ${isHamburgerOpen ? "open" : ""} group h-full flex flex-col items-center justify-center cursor-pointer gap-[6px] order-2 md:order-none`}
            onClick={toggleMenu}
            role="button"
            aria-label={isExpanded ? "Close menu" : "Open menu"}
            tabIndex={0}
            style={{ color: menuColor || "#000" }}
          >
            <div
              className={`mx-4 hamburger-line w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] ${
                isHamburgerOpen ? "translate-y-[4px] rotate-45" : ""
              } group-hover:opacity-75`}
            />
            <div
              className={`hamburger-line w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] ${
                isHamburgerOpen ? "-translate-y-[4px] -rotate-45" : ""
              } group-hover:opacity-75`}
            />
          </div>

          <div className="mx-4 logo-container flex items-center order-1 md:order-none">
            <Link href="/" className="flex items-center text-white hover:text-cyan-300 font-semibold text-xl transition-colors duration-200">
              Tech Libraries
            </Link>
          </div>

          <Link href="/LibraryPage" className="mx-4 p-4 hidden md:block text-white hover:text-cyan-300 transition-colors duration-200 order-3">
            All Libraries
          </Link>
        </div>

        <div
          className={`card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-4 flex flex-col gap-4 justify-start z-[1] ${
            isExpanded
              ? "visible pointer-events-auto"
              : "invisible pointer-events-none"
          }`}
          aria-hidden={!isExpanded}
        >
          <div className="flex flex-wrap justify-center items-center gap-2" ref={(el) => { if (el) cardsRef.current[0] = el; }}>
            {languageData.map((language) => (
              <Link
                key={language.id}
                href={`/LanguagePage/${language.id}`}
                className="flex flex-col items-center justify-center w-50 p-3 m-1 bg-gray-700 hover:bg-gray-600 rounded-4xl transition-colors duration-200 text-white hover:text-cyan-300 min-h-[60px]"
              >
                <img src={language.logo} alt={language.name} className="w-8 h-8 m-1 rounded-full mb-1" />
                <span className="text-sm text-center m-1">{language.name}</span>
              </Link>
            ))}
          </div>
          <Link
            href="/LibraryPage"
            className="self-center my-auto px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors duration-200 font-medium"
            ref={(el) => { if (el) cardsRef.current[1] = el; }}
          >
            All Libraries
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
