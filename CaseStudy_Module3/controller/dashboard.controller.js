const fs = require("fs");

class DashboardController {
  showPage(req, res) {
    fs.readFile("view/admin/dashboard.html", "utf-8", (err, data) => {
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
module.exports = DashboardController;
