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
    <div className="relative min-h-screen w-full bg-white">
      <BackgroundBeamsWithCollision className="absolute inset-0 -z-full">
        <div></div>
      </BackgroundBeamsWithCollision>
        <div className="relative flex flex-col justify-center min-h-screen p-4 sm:p-6 md:p-8">
          <div className="text-center mb-4 sm:mb-6 md:mb-8">
            <SplitText
              text="TECH LIBRARIES"
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-center text-black m-2 sm:m-3 md:m-5 p-2 sm:p-3 md:p-5"
              delay={50}
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
        
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8 lg:gap-10 max-w-[90rem] mx-auto place-items-center">
            {languageData.map((language) => (
              <LanguageHomeTile
                languageId={language.id}
                languageName={language.name}
                languageLogo={language.logo}
                key={language.id}
                width={35}
                height={35}
                isHovered={true}
                className=""
              />
            ))}
          </div>
          <p className="text-center text-black m-3 sm:m-4 md:m-5 p-3 sm:p-4 md:p-5 text-base sm:text-lg md:text-xl lg:text-2xl cursor-default"><span className="relative pb-1 inline-block after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-black after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full">More languages coming soon...</span></p>
          {/* <p className="text-center text-black m-3 sm:m-4 md:m-5 p-3 sm:p-4 md:p-5 text-base sm:text-lg md:text-xl lg:text-2xl cursor-default"><span className="relative pb-1 inline-block after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-black after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full">Please view this site in PC or Laptop. Mobile Version coming soon...</span></p> */}
        </div>
    </div>
  );
}
