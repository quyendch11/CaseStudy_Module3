const Costcategories_controller = require("../../model/costCategorie/costCategorie.model");
const fs = require("fs");
const qs = require("qs");

const costcategories = new Costcategories_controller();
class CostCateController {
  showListPage(req, res) {
    fs.readFile("view/client/index.html", "utf-8", (err, data) => {
      if (err) {
        console.log("File NotFound!");
      } else {
        fs.readFile(
          "view/client/costCategorie/index.html",
          "utf-8",
          async (err, dataCost) => {
            if (err) {
              console.log("File NotFound!");
            } else {
              let categorie = await costcategories.getCostsCategories();
              console.log(categorie);
              let tbody = "";
              for (let index = 0; index < categorie.length; index++) {
                tbody += /*html */ `
                <tr role="row" class="odd active">
                  <td>${index + 1}</td>
                  <td>${categorie[index].name}</td>
                  <td nowrap="">
                      <a href="/costCategorie/update/${categorie[index].id}"
                          class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill"
                          title="View">
                          <i class="la la-edit"></i>
                      </a>
                      <a href="/costCategorie/delete/${
                        categorie[index].id
                      }" onclick="return confirm('Bạn có muốn xóa')"
                          class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill"
                          title="View">
                          <i class="flaticon-close"></i>
                       </a>
                  </td>
                </tr>`;
              }
              dataCost = dataCost.replace("{data-cost}", tbody);
              data = data.replace("{content-main}", dataCost);
              res.writeHead(200, { "Content-Type": "text/html" });
              res.write(data);
              return res.end();
            }
          }
        );
      }
    });
  }

  // showCostFormCreate(req, res) {
  //   fs.readFile(
  //     "view/client/costCategorie/create.html",
  //     "utf-8",
  //     (err, data) => {
  //       if (err) {
  //         console.log("File NotFound!");
  //       } else {
  //         res.writeHead(200, { "Content-Type": "text/html" });
  //         res.write(data);
  //         return res.end();
  //       }
  //     }
  //   );
  // }
  showCreatePage(req, res) {
    fs.readFile("view/client/index.html", "utf-8", (err, data) => {
      if (err) {
        console.log("File NotFound!");
      } else {
        fs.readFile(
          "view/client/costCategorie/create.html",
          "utf-8",
          async (err, dataCost) => {
            if (err) {
              console.log("File NotFound!");
            } else {
              data = data.replace("{content-main}", dataCost);
              res.writeHead(200, { "Content-Type": "text/html" });
              res.write(data);
              return res.end();
            }
          }
        );
      }
    });
  }
  showUpdatePage(req, res) {
    fs.readFile("view/client/index.html", "utf-8", (err, data) => {
      if (err) {
        console.log("File NotFound!");
      } else {
        fs.readFile(
          "view/client/costCategorie/update.html",
          "utf-8",
          async (err, dataCost) => {
            if (err) {
              console.log("File NotFound!");
            } else {
              let id = req.params.id;
              let cost = await costcategories.getCostCategoryById(id);
              dataCost = dataCost.replace("{id}", cost[0].id);
              dataCost = dataCost.replace("{name}", cost[0].name);
              data = data.replace("{content-main}", dataCost);
              res.writeHead(200, { "Content-Type": "text/html" });
              res.write(data);
              return res.end();
            }
          }
        );
      }
    });
  }

  update(req, res) {
    let id = req.params.id;
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      let newcost = qs.parse(data);
      costcategories.update(id, newcost);
      res.writeHead(301, {
        location: "/costCategorie",
      });
      return res.end();
    });
  }
  createCosts(req, res) {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      let newcost = qs.parse(data);
      costcategories.createCostCate(newcost);
      res.writeHead(301, {
        location: "/costCategorie",
      });
      return res.end();
    });
  }

  delete(req, res) {
    let iddelete = req.params.id;
    costcategories.deleteCostCategories(iddelete);
    res.writeHead(301, {
      location: "/costCategorie",
    });
    return res.end();
  }
}

module.exports = CostCateController;
