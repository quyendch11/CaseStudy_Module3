const http = require("http");
const url = require("url");
const fs = require("fs");
const finalhandler = require("finalhandler");
const router = require("./router/route");

let mimeTypes = {
  jpg: "images/jpg",
  png: "images/png",
  js: "text/javascript",
  css: "text/css",
  svg: "image/svg+xml",
  ttf: "font/ttf",
  woff: "font/woff",
  woff2: "font/woff2",
  eot: "application/vnd.ms-fontobject",
};

let server = http.createServer((req, res) => {
  let parseUrl = url.parse(req.url, true);
  let path = parseUrl.pathname;
  let trimPath = path.replace(/^\/+|\/+$/g, "");
  const filesDefences = trimPath.match(
    /\.js|\.css|\.png|\.svg|\.jpg|\.ttf|\.woff|\.woff2|\.eot/
  );
  // if (filesDefences) {
  //   const extension = mimeTypes[filesDefences[0].toString().split(".")[1]];
  //   res.writeHead(200, { "Content-Type": extension });
  //   fs.createReadStream(__dirname + req.url).pipe(res);
  // }
  if (filesDefences) {
    let filePath = filesDefences[0].toString();
    let extension = mimeTypes[filesDefences[0].toString().split(".")[1]];
    if (filePath.includes("/css")) {
      extension = mimeTypes[filesDefences[0].toString().split("/")[2]];
    }
    if (extension.includes("?")) {
      extension = extension.split("?")[0];
    }
    res.writeHead(200, { "Content-Type": extension });
    fs.createReadStream(__dirname + "/" + req.url).pipe(res);
  } else {
    router(req, res, finalhandler(req, res));
  }
});

server.listen(3000, function () {
  console.log("server running at http://localhost:3000");
});