import Link from "next/link";
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
  params: { languageId: string };
}) {
  const { languageId } = params;

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
    <div className="bg-orange-200">
      <BackButton text="Back" className="rounded-full z-10 sticky top-10 -ml-1"/>
      <div className="mx-auto mb-5 flex justify-center items-center">
      <CustomTile width={104} height={20} isHovered={false} path={`/LanguagePage/${languageId}`} name={`${languageId} Libraries`}  className="uppercase text-3xl font-semibold" />
      </div>
      {languageLibraries.length === 0 ? (
        <p>No libraries found for {languageId}</p>
      ) : (
        <ul className="flex flex-wrap justify-center items-center gap-4">
          {languageLibraries.map((lib: any) => (
            <li key={lib.id} className="m-3 p-3">
              {/* <Link href={`/LibraryPage/${lib.id}`}>{lib.name}</Link> */}
              <CustomTile width={64} height={20} isHovered={true} path={`/LibraryPage/${lib.id}`} name={lib.name} subName={lib.category}/>
            </li>
          ))}
        </ul>
      )}
      <Link href={`/LanguagePage/${languageId}`}>⬅ Back to {languageId}</Link>
    </div>
  );
}
