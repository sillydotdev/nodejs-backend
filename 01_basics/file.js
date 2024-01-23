// file handling
const fs = require("fs")

// Sync...
// fs.writeFileSync("./test.txt", "My name is Kamran")

// Asyns...
fs.writeFile("./test.txt", "My name is Kamran Async", (err) => {})