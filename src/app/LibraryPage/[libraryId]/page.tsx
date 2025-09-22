import Link from "next/link";
import { notFound } from "next/navigation";
import libraries from "../../data/libraries.js";

export default function LibraryPage({
  params,
}: {
  params: { libraryId: string };
}) {
  const { libraryId } = params;
  let library: any = null;
  let language: string | null = null;

  for (const [lang, libs] of Object.entries(libraries)) {
    const found = (libs as any[]).find((lib) => lib.id === libraryId);
    if (found) {
      library = found;
      language = lang;
      break;
    }
  }

  if (!library) {
    notFound();
  }

  return (
    <div key={library.id}>
      <h1>{library.name}</h1>
      <p>
        <strong>Language:</strong> {language}
      </p>
      <p>{library.category}</p>
      <p>{library.story}</p>
      <p>{library.description}</p>
      {library.installation &&
        Object.entries(library.installation).map(([tool, command]) => (
          <p key={tool}>
            <strong>{tool}:</strong> {String(command)}
          </p>
        ))}
      <p>{library.usage.overview}</p>
      {library.usage.basic_examples?.map((ex: any, i: number) => (
        <div key={i}>
          <h3>{ex.title}</h3>
          <pre>{ex.code}</pre>
          <p>{ex.explanation}</p>
        </div>
      ))}
      {library.usage.advanced_examples?.map((ex: any, i: number) => (
        <div key={i}>
          <h3>{ex.title}</h3>
          <pre>{ex.code}</pre>
          <p>{ex.explanation}</p>
        </div>
      ))}
      {library.usage.error_handling?.map((err: any, i: number) => (
        <div key={i}>
          <strong>{err.error}</strong>: {err.solution}
        </div>
      ))}
      {library.usage.best_practices?.map((tip: string, i: number) => (
        <p key={i}>Best Practices {tip}</p>
      ))}
      <Link href={library.references.official_docs ?? "/"}>
        <button>Official Docs</button>
      </Link>
      <Link href={library.references.github ?? "/"}>
        <button>Github</button>
      </Link>
      <Link href="/">Go back</Link>
    </div>
  );
}
