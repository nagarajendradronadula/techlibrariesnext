import pythonLibraries from "./libraries/python.json";
import javaLibraries from "./libraries/java.json";
import cLibraries from "./libraries/c.json";
import cppLibraries from "./libraries/cpp.json";
import javascriptLibraries from "./libraries/javascript.json";

const libraries = [
  { id: "Python", ...pythonLibraries },
  { id: "Java", ...javaLibraries },
  { id: "C", ...cLibraries },
  { id: "CPP", ...cppLibraries },
  { id: "JavaScript", ...javascriptLibraries },
];

export default libraries;
