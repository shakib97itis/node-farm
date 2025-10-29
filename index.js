const fs = require('fs');
const http = require("http");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const pathName = req.url;

    if (pathName === "/") {
        res.end("Hello World!");
    } else if (pathName === "/api") {
        res.writeHead(200, {
            "Content-Type": "application/json"
        });
        res.end(data);
    } else {
        res.writeHead(404, {
            "Content-Type": "text/html",
            "my-own-header": "hello-world"
        })
        res.end("<h1>Page not found</h1>")
    }
});

server.listen(8000, "localhost", () => {
    console.log("server is listening on port 8000")
})