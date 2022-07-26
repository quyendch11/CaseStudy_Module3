const Costcategories_controller = require('../model/costcategories');
const fs = require('fs');
const qs = require('qs');

const costcategories = new Costcategories_controller()
class CostCateController {

    showCostCategoriesListPage(req, res) {
        fs.readFile('views/cost_catagories.html', 'utf-8', async (err, data) => {
            if (err) {
                console.log('File NotFound!');
            } else {
                let costs = await costcategories.getCostsCategories();
                let tbody = '';
                for (let index = 0; index < costs.length; index++) {
                    tbody += `<tr>
                    <td>${index + 1}</td>
                    <td>${costs[index].name}</td>
                    <td><a href="/costcategories/detail/${costs[index].id}" class="btn btn-primary">detail</a></td>
                    <td><a href="/costcategories/setcategories/${costs[index].id}" class="btn btn-primary">setting</a></td>
                    <td><a href="/costcategories/${costs[index].id}/delete" class="btn btn-danger" onclick="confirm('are you sure')">Delete</a></td>
                </tr>`;
                }
                data = data.replace('{cost}', tbody);
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                return res.end();
            }
        });
    }

    showCostFormCreate(req, res) {
        fs.readFile('views/createcostcategories.html', 'utf-8', (err, data) => {
            if (err) {
                console.log('File NotFound!');
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                return res.end();
            }
        });
    }

    createCostCategories(req, res) {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => {
            let cost = qs.parse(data);
            costcategories.createCostCate(cost);
            res.writeHead(301, {
                location: '/costcategories'
            });
            return res.end();
        });
    }

 deleteCostCategories(req,res){
        let iddelete = req.params.id;
        console.log(iddelete)
    costcategories.deleteCostCategories(iddelete);
    res.writeHead(301, {
        location: '/costcategories'
    });
    return res.end();
}

}

module.exports = CostCateController;