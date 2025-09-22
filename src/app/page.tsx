"use client";

import languageData from "./data/languagedata";
import SplitText from "./components/SplitText";
import React from "react";
import { useRouter } from "next/navigation";
import { BackgroundBeamsWithCollision } from "./components/background-beams-with-collision";
import LanguageHomeTile from "./components/languageHomeTile";

export default function Home() {
  const router = useRouter();
  return (
    <div className="relative min-h-screen w-full">
      <BackgroundBeamsWithCollision className="absolute inset-0 -z-full bg-orange-200">
        <div></div>
      </BackgroundBeamsWithCollision>
        <div className="relative flex flex-col justify-center h-screen p-4">
          <div className="text-center mb-8">
            <SplitText
              text="TECH LIBRARIES"
              className="text-8xl text-center text-black m-5 p-5"
              delay={100}
              repeat={-1}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
            />
          </div>
        
          <div className="flex flex-wrap justify-center">
            {languageData.map((language) => (
              <LanguageHomeTile
                languageId={language.id}
                languageName={language.name}
                languageLogo={language.logo}
                key={language.id}
                width={50}
                height={50}
                isHovered={true}
                className="m-5"
              />
            ))}
          </div>
          <p className="text-center m-5 p-5 text-xl">More languages coming soon...</p>
        </div>
    </div>
  );
}
