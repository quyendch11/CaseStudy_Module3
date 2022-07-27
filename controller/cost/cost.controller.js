const fs = require("fs");
const Cost = require("../../model/cost/cost.model");
const cost = new Cost();
class CostController {
  showCreatePage(req, res) {
    fs.readFile("view/client/index.html", "utf-8", (err, data) => {
      if (err) {
        console.log("File NotFound!");
      } else {
        fs.readFile(
          "view/client/cost/createCost.html",
          "utf-8",
          (err, dataCost) => {
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
              let costs = await cost.getAllCost();
              console.log(costs);
              let tbody = "";
              for (let index = 0; index < costs.length; index++) {
                tbody += /*html */ `
                <tr role="row" class="odd active">
                  <td class=" dt-right" tabindex="0">
                  <label
                    class="m-checkbox m-checkbox--single m-checkbox--solid m-checkbox--brand">
                    <input type="checkbox" value="" class="m-checkable">
                    <span></span>
                  </label>
                  </td>
                  <td>${index + 1}</td>
                  <td>${costs[index].costdate}</td>
                  <td>${costs[index].money}</td>
                  <td>${costs[index].note}</td>
                  <td nowrap="">
                      <a href="#"
                          class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill"
                          title="View">
                          <i class="la la-edit"></i>
                      </a>
                      <a href="#"
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
  createCost(cost, idinput) {
    let insertQuery = `insert into Costs(costdate, note, money,daylimit,weeklimit,monthlimit,userid,costcategorieid)
                       VALUES ('${cost.costdate}', '${cost.note}', ${cost.money}, ${cost.daylimit}, ${cost.weeklimit}, ${cost.monthlimit}, ${cost.userid}, ${idinput})`;
    return new Promise((resolve, reject) => {
      this.connection.query(insertQuery, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve("Insert success");
        }
      });
    });
  }
}
module.exports = CostController;
