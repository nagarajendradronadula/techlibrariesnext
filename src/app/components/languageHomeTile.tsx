import Link from "next/link";
import React from "react";

interface LanguageHomeTileProps {
  languageId: string;
  languageName: string;
  languageLogo: string;
  width: number;
  height: number;
  isHovered: boolean;
  className?: string;
}

export default function LanguageHomeTile({
  languageId,
  languageName,
  languageLogo,
  width,
  height,
  isHovered,
  className,
}: LanguageHomeTileProps) {
  return (
    <div>
      <Link
        className={`p-4 border-t-1 border-l-1 border-r-2 border-b-2 bg-gray-700 border-stone-200 shadow-md shadow-stone-300 flex flex-col items-center justify-center text-center ${
          isHovered
            ? "hover:shadow-2xl hover:scale-110 duration-150 transition-all ease-in-out"
            : ""
        } cursor-pointer rounded-2xl w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48 ${className}`}
        href="/LanguagePage/[languageId]"
        as={`/LanguagePage/${languageId}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <img
          src={languageLogo}
          alt={languageName}
          className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 m-2 sm:m-3 md:m-4 lg:m-5"
        ></img>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold m-1 sm:m-2 md:m-3 lg:m-4 text-white">{languageName}</p>
      </Link>
    </div>
  );
}
