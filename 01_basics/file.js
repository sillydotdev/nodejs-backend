// file handling
const fs = require("fs")

// Write into a file
// Sync...
// fs.writeFileSync("./test.txt", "My name is Kamran")

// Asyns...
// fs.writeFile("./test.txt", "My name is Kamran Async", (err) => {})


// Read from a file
// const result = fs.readFileSync("./contacts.txt", "utf-8");
// console.log(result);

fs.readFile("./contacts.txt", "utf-8", (err, result) => {
    if(err) {
        console.log("Error", err);
    } else {
        console.log(result);
    }
})

// appending to a file
fs.appendFileSync("./test.txt", new Date().getDate().toLocaleString())
fs.appendFileSync("./test.txt", `\n Hey there`)

// copy a file
fs.cpSync("./test.txt", "./copy.txt")

// delete a file
fs.unlinkSync("./copy.txt")

// stats about a file
console.log(fs.statSync("./test.txt"));
