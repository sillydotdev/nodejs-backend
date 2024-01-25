const http = require("http")
const fs = require("fs")
const url = require("url")

const myServer = http.createServer((req, res) => {
    // console.log("New request received");
    // console.log(req.headers);
    const log = `${Date.now()}: ${req.method} ${req.url} New request received\n`;
    const myUrl = url.parse(req.url, true)
    fs.appendFile("log.txt", log, (err, data) => {
        switch(myUrl.pathname) {
            case "/":
                if(req.method === "GET") res.end("Home page");
                break;
            case "/about":
                const username = myUrl.query.myname
                res.end(`Hi, ${username}`);
                break;
            case "/contact-us":
                res.end("contact-us")
                break;
            case "/search":
                const search = myUrl.query.search_query
                res.end("Here is you search for:"+ search)
                break;
            case "/signup":
                if(req.method === "GET") res.end("This is a sign up form")
                else if(req.method === "POST"){
                    // DB query
                    res.end("Success!!!")
                }
            default:
                res.end("Not Found!")
        }
        
    })
})

myServer.listen(8000, () => console.log("Server started!!!"))