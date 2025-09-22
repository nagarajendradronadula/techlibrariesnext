const pythonJSON = require("./languages/python.json");
const javaJSON = require("./languages/java.json");
const cJSON = require("./languages/c.json");
const cppJSON = require("./languages/cpp.json");
const javascriptJSON = require("./languages/javascript.json");

// const languageData = {
//   Python: pythonJSON,
//   Java: javaJSON,
//   C: cJSON,
//   CPP: cppJSON,
//   JavaScript: javascriptJSON,
// };

const languageData = [
  { id: "Python", ...pythonJSON },
  { id: "Java", ...javaJSON },
  { id: "C", ...cJSON },
  { id: "CPP", ...cppJSON },
  { id: "JavaScript", ...javascriptJSON },
];

export default languageData;