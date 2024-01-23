const fs = require("fs")
const os = require("os")

console.log(os.cpus().length);

// console.log("1");
// // Blocking operation -- here output will be : 1, reads file, then 2
// const result = fs.readFileSync("./contacts.txt", "utf-8")
// console.log(result);

// console.log("2");


console.log("1");
// Non-Blocking operation -- here output will be : 1, 2, then reads file
fs.readFile("./contacts.txt", "utf-8", (err, result) => {
    console.log(result);
})

console.log("2");

