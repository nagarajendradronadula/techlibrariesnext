'use client'

import "./globals.css";
import languageData from "./data/languagedata";
import CardNav from "./components/CardNav";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <html>
      <body className="bg-white">
        <CardNav
          logo=""
          logoAlt="Tech Libraries"
          items={[]}
          languageData={languageData}
          baseColor="#1f2937"
          menuColor="#fff"
          buttonBgColor="#111"
          buttonTextColor="#fff"
          ease="power3.out"
        />
        <div className="bg-white pt-24">
          {children}
        </div>
      </body>
    </html>
  );
}
