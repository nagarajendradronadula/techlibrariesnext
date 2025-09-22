const pythonLibraries = require("./libraries/python.json");
const javaLibraries = require("./libraries/java.json");
const cLibraries = require("./libraries/c.json");
const cppLibraries = require("./libraries/cpp.json");
const javascriptLibraries = require("./libraries/javascript.json");

const libraries = [
  { id: "Python", ...pythonLibraries },
  { id: "Java", ...javaLibraries },
  { id: "C", ...cLibraries },
  { id: "CPP", ...cppLibraries },
  { id: "JavaScript", ...javascriptLibraries },
];

export default libraries;