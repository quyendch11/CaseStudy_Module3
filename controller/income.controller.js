const fs = require('fs');
const qs = require('qs');
const Incomes = require('../model/income.model');

const incomes = new Incomes();
class IncomesController {
    constructor() {
        // this.incomes = new Incomes()
    }
    showIncomesList(req, res) {
        fs.readFile('view/client/index.html', 'utf8', async (err, data) => {
            if (err) {
                console.log(err);
            }
            else {
                let incomesList = await incomes.getIncomesList()
                let tbody = ''
              
                incomesList.map((incomes, index) => {
                    tbody += /*html*/`</tr>
                    <td>${index + 1}</td>
                    <td>${incomes.note}</td>
                    <td>${incomes.money}</td>
                    <td>${incomes.incomedate}</td>
                    <td><a href="/incomesList/edit/${incomesList.id}" class="btn btn-primary">Edit</a></td>
                    <td><a href="/incomesList/delete/${incomesList.id}" class="btn btn-danger">Delete</a></td>
                  </tr>`
                });
                data = data.replace('{incomesList}', tbody);
                res.writeHead(200, { 'Content-type': 'text/html' });
                res.write(data);
                res.end();
            }
        })
    }
    
}
module.exports = IncomesController;