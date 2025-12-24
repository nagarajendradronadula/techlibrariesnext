import Link from "next/link";
import { use } from "react";
import libraries from "../../../data/libraries.js";
import languageData from "../../../data/languagedata.js";
import BackButton from "@/app/components/BackButton";
import CustomTile from "@/app/components/CustomTile"

export async function generateStaticParams() {
  return languageData.map((language) => ({ languageId: language.id }));
}

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
    <>
      <BackButton text="Back" className="hidden sm:block rounded-full z-50 fixed top-36 left-28 text-sm sm:text-base"/>
      <div className="bg-white px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8">
      <div className="mx-auto mb-5 flex justify-center items-center px-4">
        <div className="block sm:hidden">
          <CustomTile width={70} height={16} isHovered={false} path={`/LanguagePage/${languageId}`} name={`${languageId} Libraries`}  className="uppercase text-sm font-semibold hover:scale-110 transition-transform duration-300 ease-in-out !bg-black !text-white" />
        </div>
        <div className="hidden sm:block md:hidden">
          <CustomTile width={85} height={18} isHovered={false} path={`/LanguagePage/${languageId}`} name={`${languageId} Libraries`}  className="uppercase text-lg font-semibold hover:scale-110 transition-transform duration-300 ease-in-out !bg-black !text-white" />
        </div>
        <div className="hidden md:block">
          <CustomTile width={104} height={20} isHovered={false} path={`/LanguagePage/${languageId}`} name={`${languageId} Libraries`}  className="uppercase text-2xl lg:text-3xl font-semibold hover:scale-110 transition-transform duration-300 ease-in-out !bg-black !text-white" />
        </div>
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
        <ul className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-12 xl:gap-16 max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          {languageLibraries.map((lib: any) => (
            <li key={lib.id} className="flex justify-center">
              <div className="block sm:hidden">
                <CustomTile width={35} height={28} isHovered={true} path={`/LibraryPage/${lib.id}`} name={lib.name} subName={lib.category}/>
              </div>
              <div className="hidden sm:block lg:hidden">
                <CustomTile width={60} height={30} isHovered={true} path={`/LibraryPage/${lib.id}`} name={lib.name} subName={lib.category}/>
              </div>
              <div className="hidden lg:block">
                <CustomTile width={65} height={28} isHovered={true} path={`/LibraryPage/${lib.id}`} name={lib.name} subName={lib.category}/>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Link href={`/LanguagePage/${languageId}`}>⬅ Back to {languageId}</Link>
      </div>
    </>
  );
}
