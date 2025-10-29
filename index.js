const fs = require('fs');
const http = require("http");

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%ID%}/g, product.id);
  output = output.replace(/{%NAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);

  if(!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  }

  return output;
}

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8");
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const pathName = req.url;

    if (pathName === "/" || pathName === "/overview") {
        const cardHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join("");
        const finalOutput = tempOverview.replace("{%CARDS%}", cardHtml);
        // Overview
        res.writeHead(200, { "Content-Type": "text/html" })
        res.end(finalOutput);
    } else if (pathName === "/product") {
        // Product
        res.writeHead(200, { "Content-Type": "text/html" })
        const productHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join("");
        const output = tempOverview.replace("{%PRODUCT_CARDS%}", productHtml);
        res.end(output);
    } else if (pathName === "/product/:id") {
        // Product detail
        res.writeHead(200, {
            "Content-Type": "text/html",
            "my-own-header": "hello-world"
        })
        res.end("<h1>Product detail</h1>");
    }
    else if (pathName === "/api") {
        // api
        res.writeHead(200, {
            "Content-Type": "application/json"
        });
        res.end(data);
    } else {
        // Page not found
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