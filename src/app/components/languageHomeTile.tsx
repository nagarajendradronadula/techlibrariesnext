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
        } cursor-pointer rounded-2xl ${className}`}
        href="/LanguagePage/[languageId]"
        as={`/LanguagePage/${languageId}`}
        style={{ transformStyle: 'preserve-3d', width: `${width * 5}px`, height: `${height * 5}px` }}
      >
        <img
          src={languageLogo}
          alt={languageName}
          className="w-32 h-32 m-5"
        ></img>
        <p className="text-4xl font-semibold m-5">{languageName}</p>
      </Link>
    </div>
  );
}
