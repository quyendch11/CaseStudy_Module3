const fs = require("fs");

class HomeController {
  showHomePage(req, res) {
    fs.readFile("view/client/index.html", "utf-8", (err, data) => {
      if (err) {
        console.log("File NotFound!");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      }
    });
  }
}
module.exports = HomeController;
