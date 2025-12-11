import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import libraries from "../../data/libraries.js";
import BackButton from "@/app/components/BackButton"

export async function generateStaticParams() {
  const allLibraries = [];
  for (const langData of libraries) {
    const libs = Object.values(langData).filter(item => Array.isArray(item) || (typeof item === 'object' && item !== null && 'id' in item)).flat();
    allLibraries.push(...libs);
  }
  return allLibraries.map((lib: any) => ({ libraryId: lib.id }));
}

export default function LibraryPage({
  params,
}: {
  params: Promise<{ libraryId: string }>;
}) {
  const { libraryId } = use(params);
  let library: any = null;
  let language: string | null = null;

  for (const langData of libraries) {
    const libs = Object.values(langData).filter(item => Array.isArray(item) || (typeof item === 'object' && item !== null && 'id' in item)).flat();
    const found = libs.find((lib: any) => lib.id === libraryId);
    if (found) {
      library = found;
      language = langData.id;
      break;
    }
  }

  if (!library) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white p-8 max-w-6xl mx-auto">
      <BackButton text="Back" className="rounded-full z-50 sticky top-34 -ml-1"/>
      <h1 className="text-4xl font-bold text-black mb-2">{library.name}</h1>
      <p className="text-gray-600 mb-1"><strong>Language:</strong> {language}</p>
      <p className="text-gray-600 mb-6">{library.category}</p>
      
      <div className="mb-8">
        <p className="text-gray-800 leading-relaxed mb-4">{library.story}</p>
        <p className="text-gray-800 leading-relaxed">{library.description}</p>
      </div>

      {library.installation && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-black mb-4">Installation</h2>
          {Object.entries(library.installation).map(([tool, command]) => (
            <div key={tool} className="mb-2">
              <strong className="text-black">{tool}:</strong> <code className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">{String(command)}</code>
            </div>
          ))}
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-black mb-4">Usage</h2>
        <p className="text-gray-800 leading-relaxed mb-6">{library.usage.overview}</p>
        
        {library.usage.basic_examples?.map((ex: any, i: number) => (
          <div key={i} className="mb-6">
            <h3 className="text-xl font-semibold text-black mb-2">{ex.title}</h3>
            <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-2"><code>{ex.code}</code></pre>
            <p className="text-gray-600 italic">{ex.explanation}</p>
          </div>
        ))}
        
        {library.usage.advanced_examples?.map((ex: any, i: number) => (
          <div key={i} className="mb-6">
            <h3 className="text-xl font-semibold text-black mb-2">{ex.title}</h3>
            <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-2"><code>{ex.code}</code></pre>
            <p className="text-gray-600 italic">{ex.explanation}</p>
          </div>
        ))}
      </div>

      {library.usage.error_handling && library.usage.error_handling.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-black mb-4">Error Handling</h2>
          {library.usage.error_handling.map((err: any, i: number) => (
            <div key={i} className="mb-3 p-4 bg-red-50 rounded-lg">
              <strong className="text-red-700">{err.error}:</strong> <span className="text-gray-800">{err.solution}</span>
            </div>
          ))}
        </div>
      )}

      {library.usage.best_practices && library.usage.best_practices.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-black mb-4">Best Practices</h2>
          {library.usage.best_practices.map((tip: string, i: number) => (
            <p key={i} className="mb-2 text-gray-800 pl-4 border-l-4 border-blue-500">{tip}</p>
          ))}
        </div>
      )}

      <div className="flex gap-4 mt-8 justify-center">
        <Link href={library.references.official_docs ?? "/"} className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
          Official Docs
        </Link>
        <Link href={library.references.github ?? "/"} className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
          Github
        </Link>
      </div>
    </div>
  );
}
