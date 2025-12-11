'use client'

import Link from "next/link";
import { use } from "react";
import libraries from "../../../data/libraries.js";
import BackButton from "@/app/components/BackButton";
import CustomTile from "@/app/components/CustomTile"

type Library = {
  id: string;
  name: string;
  category?: string;
  description?: string;
};

type LanguageData = {
  id: string;
  [key: string]: any;
};

const typedLibraries = libraries as LanguageData[];

export default function LanguageLibrariesPage({
  params,
}: {
  params: Promise<{ languageId: string }>;
}) {
  const { languageId } = use(params);

  // Find the language data by matching the id
  const languageData = typedLibraries.find(
    (lang) => lang.id.toLowerCase() === languageId.toLowerCase()
  );
  
  // Extract libraries array from the language data (excluding the 'id' field)
  const languageLibraries: Library[] = languageData 
    ? Object.values(languageData).filter((item) => 
        Array.isArray(item) ? item : typeof item === 'object' && item !== null && 'id' in item
      ).flat()
    : [];

  return (
    <div className="bg-white">
      <BackButton text="Back" className="rounded-full z-50 sticky top-34 -ml-1"/>
      <div className="mx-auto mb-5 flex justify-center items-center">
      <CustomTile width={104} height={20} isHovered={false} path={`/LanguagePage/${languageId}`} name={`${languageId} Libraries`}  className="uppercase text-3xl font-semibold hover:scale-110 transition-transform duration-300 ease-in-out" />
      </div>
      {languageLibraries.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <div className="text-center space-y-4">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-3xl font-bold text-gray-800 capitalize">{languageId} Libraries</h2>
            <p className="text-xl text-gray-600 max-w-md mx-auto">Libraries coming soon for {languageId}...</p>
            <p className="text-sm text-gray-500">We&apos;re working on adding comprehensive library documentation.</p>
          </div>
        </div>
      ) : (
        <ul className="flex flex-wrap justify-center items-center gap-4">
          {languageLibraries.map((lib: any) => (
            <li key={lib.id} className="m-3 p-3">
              {/* <Link href={`/LibraryPage/${lib.id}`}>{lib.name}</Link> */}
              <CustomTile width={80} height={32} isHovered={true} path={`/LibraryPage/${lib.id}`} name={lib.name} subName={lib.category}/>
            </li>
          ))}
        </ul>
      )}
      <Link href={`/LanguagePage/${languageId}`}>⬅ Back to {languageId}</Link>
    </div>
  );
}
