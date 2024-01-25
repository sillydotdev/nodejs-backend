const http = require("http")
const fs = require("fs")

const myServer = http.createServer((req, res) => {
    // console.log("New request received");
    // console.log(req.headers);
    const log = `${Date.now()}: ${req.url} New request received\n`
    fs.appendFile("log.txt", log, (err, data) => {
        switch(req.url) {
            case "/":
                res.end("Home page");
                break;
            case "/about":
                res.end("About page");
                break;
            case "/contact-us":
                res.end("contact-us")
                break;
            default:
                res.end("Nothing")
        }
        
    })
})

myServer.listen(8000, () => console.log("Server started!!!"))