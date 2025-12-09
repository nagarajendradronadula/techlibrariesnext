'use client'

import libraries from "../data/libraries";
import CustomTile from "@/app/components/CustomTile";
import BackButton from "@/app/components/BackButton";
import { useSearchParams } from "next/navigation";
import { useMemo, Suspense } from "react";

function LibraryContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';
  
  const filteredLibraries = useMemo(() => {
    if (!searchQuery) return libraries;
    
    return libraries.map((languageData: Record<string, unknown>) => {
      const languageLibraries = Object.values(languageData)
        .filter((item: unknown) => 
          typeof item === 'object' && 
          item !== null && 
          'id' in item && 
          'name' in item &&
          typeof item.id === 'string' &&
          typeof item.name === 'string' &&
          (item.name.toLowerCase().includes(searchQuery) || 
           ('category' in item && typeof item.category === 'string' && item.category.toLowerCase().includes(searchQuery)))
        );
      
      return languageLibraries.length > 0 ? { ...languageData, filtered: languageLibraries } : null;
    }).filter((item): item is Record<string, unknown> & { id: string; filtered: unknown[] } => item !== null);
  }, [searchQuery]);
  return (
    <div className="bg-white min-h-screen p-8">
      <BackButton text="Back" className="rounded-full z-50 sticky top-34f -ml-1"/>
      <h1 className="text-4xl font-bold text-center mb-8 text-black">
        {searchQuery ? `Search Results for &quot;${searchQuery}&quot;` : 'All Libraries'}
      </h1>
      
      <div className="space-y-12">
        {filteredLibraries.map((languageData: Record<string, unknown> & { id: string; filtered?: unknown[] }) => {
          const languageLibraries = searchQuery ? languageData.filtered : Object.values(languageData)
            .filter((item: unknown) => 
              typeof item === 'object' && 
              item !== null && 
              'id' in item && 
              'name' in item &&
              typeof item.id === 'string' &&
              typeof item.name === 'string'
            );
          
          return (
            <div key={languageData.id}>
              <div className="flex justify-center mb-6">
                <CustomTile width={80} height={20} isHovered={false} path={`/LanguagePage/${languageData.id.toLowerCase()}`} name={`${languageData.id} Libraries`} className="uppercase text-2xl font-semibold !bg-black !text-white border-white"/>
              </div>
              <ul className="grid grid-cols-2 md:flex md:flex-wrap justify-center items-center gap-3 md:gap-4">
                {(languageLibraries as Array<{ id: string; name: string; category?: string }>).map((library) => (
                  <li key={`${languageData.id}-${library.id}`}>
                    <CustomTile width={80} height={32} isHovered={true} path={`/LibraryPage/${library.id}`} name={library.name} subName={library.category} className="!w-44 !h-24 md:!w-80 md:!h-32 !text-xs md:!text-3xl"/>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
        {filteredLibraries.length === 0 && searchQuery && (
          <p className="text-center text-gray-600 text-xl">No libraries found matching &quot;{searchQuery}&quot;</p>
        )}
      </div>
    </div>
  );
}

export default function LibraryPage() {
  return (
    <Suspense fallback={<div className="bg-white min-h-screen p-8 flex items-center justify-center"><p className="text-xl">Loading...</p></div>}>
      <LibraryContent />
    </Suspense>
  );
}
