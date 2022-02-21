// import the modules
const http = require('http');
const fs = require('fs');
const url = require('url')

// Create a server

const page404 = fs.readFileSync("404.html", "utf-8", (err, data) => {
  if (err) throw err;
  return data;
});

http
  .createServer(function (req, res) {
    const page = url.parse(req.url, true);
    let filename = "";
    if (page.pathname === "/") {
      filename = "." + "/index.html";
    } else if (page.pathname === "/about") {
      filename = "." + "/about.html"
    } else if (page.pathname === "/contact-me") {
      filename = "." + "/contact-me.html"
    } 

    fs.readFile(filename, function (err, data) {
      if (err) {
        res.writeHead(404, {"Content-Type": "text/html"});
        res.write(page404)
        return res.end()
      }else {
        res.writeHead(200, {"Content-Type": "text/html"})
        res.write(data);
        return res.end();
      }
    })
  })
  .listen(8080)
// Route the pages to the correct link

// If the route is wrong server the 404 page