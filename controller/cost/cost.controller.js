const fs = require("fs");
const qs = require("qs");
const Cost = require("../../model/cost/cost.model");
var cookie = require("cookie");
const costcategories = require("../../model/costCategorie/costCategorie.model");
const UserController = require("../user/user.controller");
const costModel = new Cost();
const userController = new UserController();
const Costcategories = new costcategories();
class CostController {
  showCreatePage(req, res) {
    fs.readFile("view/client/index.html", "utf-8", (err, data) => {
      if (err) {
        console.log("File NotFound!");
      } else {
        fs.readFile(
          "view/client/cost/createCost.html",
          "utf-8",
          async (err, dataCost) => {
            if (err) {
              console.log("File NotFound!");
            } else {
              let costcategory = await Costcategories.getCostsCategories();
              let tbody = "";
              for (const item of costcategory) {
                tbody += `<option value="${item.id}">${item.name}</option>`;
              }
              dataCost = dataCost.replace("{option", tbody);
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
          "view/client/cost/updateCost.html",
          "utf-8",
          async (err, dataCost) => {
            if (err) {
              console.log("File NotFound!");
            } else {
              let id = req.params.id;
              let cost = await costModel.getcostcategorieid(id);
              let costCategorie = await Costcategories.getCostCategoryById(
                cost[0].costCategorieid
              );
              dataCost = dataCost.replace("{id}", cost[0].id);
              dataCost = dataCost.replace("{costdate}", cost[0].costdate);
              dataCost = dataCost.replace("{money}", cost[0].money);
              dataCost = dataCost.replace(
                "{option}",
                `<option value="${costCategorie[0].id}">${costCategorie[0].name}</option>`
              );
              dataCost = dataCost.replace("{note@}", cost[0].note);

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
  showListPage(req, res) {
    fs.readFile("view/client/index.html", "utf-8", (err, data) => {
      if (err) {
        console.log("File NotFound!");
      } else {
        fs.readFile(
          "view/client/cost/index.html",
          "utf-8",
          async (err, dataCost) => {
            if (err) {
              console.log("File NotFound!");
            } else {
              let costs = await costModel.getAllCost();

              let tbody = "";
              for (let index = 0; index < costs.length; index++) {
                let costCategory = await Costcategories.getCostCategoryById(
                  costs[index].costCategorieid
                );
                for (const costCategorie of costCategory) {
                  tbody += /*html */ `
                <tr role="row" class="odd active">
                  <td>${index + 1}</td>
                  <td>${costs[index].costdate}</td>
                  <td>${costs[index].money}</td>
                  <td>${costCategorie.name}</td>
                  <td>${costs[index].note}</td>
                  <td nowrap="">
                      <a href="/cost/update/${costs[index].id}"
                          class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill"
                          title="View">
                          <i class="la la-edit"></i>
                      </a>
                      <a href="/cost/delete/${
                        costs[index].id
                      }" onclick="return confirm('Bạn có muốn xóa')"
                          class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill"
                          title="View">
                          <i class="flaticon-close"></i>
                       </a>
                  </td>
                </tr>`;
                }
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
  async updateCost(req, res) {
    let idedit = req.params.id;
    let cookies = cookie.parse(req.headers.cookie || "");
    let userid = "";
    if (cookies.Token) {
      await fs.readFile(
        "token/" + cookies.Token + ".txt",
        "utf8",
        (err, data) => {
          if (err) {
            console.error("error" + err.message);
          }
          userid = JSON.parse(data).id;
          let dataCost = "";
          req.on("data", (chunk) => {
            dataCost += chunk;
          });
          req.on("end", () => {
            let cost = qs.parse(dataCost);
            let newCost = {
              costdate: cost.costdate,
              note: cost.note,
              money: cost.money,
              costcategorieid: cost.costCategorieid,
              userid: userid,
            };
            console.log(newCost, idedit);
            costModel.updateCost(idedit, newCost);
            res.writeHead(301, {
              location: "/cost",
            });
            return res.end();
          });
        }
      );
    }
  }
  async createCosts(req, res) {
    let cookies = cookie.parse(req.headers.cookie || "");
    let userid = "";
    if (cookies.Token) {
      await fs.readFile(
        "token/" + cookies.Token + ".txt",
        "utf8",
        (err, data) => {
          if (err) {
            console.error("error" + err.message);
          }
          userid = JSON.parse(data).id;
          let dataCost = "";
          req.on("data", (chunk) => {
            dataCost += chunk;
          });
          req.on("end", () => {
            let cost = qs.parse(dataCost);
            let newCost = {
              costdate: cost.costdate,
              note: cost.note,
              money: cost.money,
              costcategorieid: cost.costCategorieid,
              userid: userid,
            };
            costModel.createCost(newCost);
            res.writeHead(301, {
              location: "/cost",
            });
            return res.end();
          });
        }
      );
    }
  }
  async deleteCost(req, res) {
    let iddelete = req.params.id;
    //  let currentCost = await costs.getcostcategorieid(iddelete);
    await costModel.deleteCost(iddelete);
    res.writeHead(301, {
      location: `/cost`,
    });
    return res.end();
  }
}
module.exports = CostController;
