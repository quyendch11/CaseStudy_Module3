const fs = require('fs');
const qs = require('qs');

const cost_controller = require('../model/costs');

class costController {
    constructor() {
        this.cost = new cost_controller();
    }

    showCostListPage(req, res,id) {
        fs.readFile('views/detailcost.html', 'utf-8', async (err, data) => {
            if (err) {
                console.log('File NotFound!');
            } else {
                let costs = await this.cost.getdetailCost(id);
                let tbody = '';
                for (let index = 0; index < costs.length; index++) {
                    tbody += `<tr>
                    <td>${index + 1}</td>
                    <td>${costs[index].costdate}</td>
                    <td>${costs[index].note}</td>
                    <td>${costs[index].money}</td>
                    <td>${costs[index].daylimit}</td>
                    <td>${costs[index].weeklimit}</td>
                    <td>${costs[index].monthlimit}</td>
                    <td><a href="/costcategories/edit?id=${costs[index].id}" class="btn btn-primary">edit</a></td>
                    <td><a href="/costcategories/delete?id=${costs[index].id}" class="btn btn-danger">Delete</a></td>
                </tr>`;
                }
                data = data.replace('{detailcost}', tbody);
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                return res.end();
            }
        });
    }
}

module.exports = costController;