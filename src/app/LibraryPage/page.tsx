import libraries from "../data/libraries";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function LibraryPage(
  {
    // params,
    //   }: {
    // params: { libraryId: string };
  }
) {
  // const { libraryId } = params;
  // const library = libraries.find((library: { id: string; }) => library.id === libraryId);

  // if (!library) {
  //   notFound();
  // }
  console.log(libraries);

  return (
    <div>
      {/* {Object.values(libraries).map((library: any) => (
            <div key={library.id}>
              <Link href={`/LibraryPage/${library.id}`}>
                <h1>{library.name}</h1>
                <p> {library.category}</p>
              </Link>
            </div>
          ))} */}

      {Object.values(libraries).flatMap((languageData: any) =>
        Object.values(languageData)
          .filter((item: any) => 
            typeof item === 'object' && 
            item !== null && 
            'id' in item && 
            'name' in item &&
            typeof item.id === 'string' &&
            typeof item.name === 'string'
          )
          .map((library: any) => (
            <div key={library.id}>
              <Link href={`/LibraryPage/${library.id}`}>
                <h1>{library.name}</h1>
                <p>{library.category}</p>
              </Link>
            </div>
          ))
      )}
      <Link href="/">Go back</Link>
    </div>
  );
}
