'use client'

import { useEffect, useState } from "react";
import CardNav from "./CardNav";

export default function ClientLayout({
  children,
  languageData,
}: {
  children: React.ReactNode;
  languageData: any[];
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <CardNav
        logo="/ChatGPT_Image_Dec_24__2025__11_21_18_PM-removebg-preview.png"
        logoAlt="Tech Libraries"
        items={[]}
        languageData={languageData}
        baseColor="#1f2937"
        menuColor="#fff"
        buttonBgColor="#111"
        buttonTextColor="#fff"
        ease="power3.out"
      />
      <div className="bg-white pt-16 sm:pt-20 md:pt-24 lg:pt-28">
        {children}
      </div>
    </>
  );
}