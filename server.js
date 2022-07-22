const http = require("http");
const url = require("url");
const formidable = require("formidable");
const fs = require("fs");
const Router = require("router");
const finalhandler = require("finalhandler");
let router = Router();

router.get("/", (req, res) => {

});

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
    // let urlPath = req.url;
    const filesDefences = trimPath.match(
        /\.js|\.css|\.png|\.svg|\.jpg|\.ttf|\.woff|\.woff2|\.eot/
    );
    if (filesDefences) {
        const extension = mimeTypes[filesDefences[0].toString().split(".")[1]];
        res.writeHead(200, { "Content-Type": extension });
        fs.createReadStream(__dirname + req.url).pipe(res);
    } else {
        router(req, res, finalhandler(req, res));
    }
});

server.listen(3000, function () {
    console.log("server running at http://localhost:3000");
});
