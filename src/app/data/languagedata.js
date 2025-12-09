import pythonJSON from "./languages/python.json";
import javaJSON from "./languages/java.json";
import cJSON from "./languages/c.json";
import cppJSON from "./languages/cpp.json";
import javascriptJSON from "./languages/javascript.json";
import csharpJSON from "./languages/csharp.json";
import goJSON from "./languages/go.json";
import kotlinJSON from "./languages/kotlin.json";
import phpJSON from "./languages/php.json";
import rubyJSON from "./languages/ruby.json";
import rustJSON from "./languages/rust.json";
import swiftJSON from "./languages/swift.json";
import typescriptJSON from "./languages/typescript.json";

const languageData = [
  { id: "Python", ...pythonJSON },
  { id: "Java", ...javaJSON },
  { id: "C", ...cJSON },
  { id: "CPP", ...cppJSON },
  { id: "JavaScript", ...javascriptJSON },
  { id: "CSharp", ...csharpJSON },
  { id: "Go", ...goJSON },
  { id: "Kotlin", ...kotlinJSON },
  { id: "Php", ...phpJSON },
  { id: "Ruby", ...rubyJSON },
  { id: "Rust", ...rustJSON },
  { id: "Swift", ...swiftJSON },
  { id: "TypeScript", ...typescriptJSON },
];

export default languageData;
