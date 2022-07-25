const Costcategories_controller = require('../model/costcategories');
const fs = require('fs');
const qs = require('qs');

class CostCateController {
    constructor() {
        this.costs = new Costcategories_controller();
    }

    showCostCategoriesListPage(req, res) {
        fs.readFile('views/cost_catagories.html', 'utf-8', async (err, data) => {
            if (err) {
                console.log('File NotFound!');
            } else {
                let costs = await this.costs.getCostsCategories();
                let tbody = '';
                for (let index = 0; index < costs.length; index++) {
                    tbody += `<tr>
                    <td>${index + 1}</td>
                    <td>${costs[index].name}</td>
                    <td><a href="/costcategories/detailcost?id=${costs[index].id}" class="btn btn-primary">detail</a></td>
                    <td><a href="/costcategories/delete?id=${costs[index].id}" class="btn btn-danger">Delete</a></td>
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
            this.costs.createCostCate(cost);
            res.writeHead(301, {
                location: '/costcategories'
            });
            return res.end();
        });
    }

    // showProductEditForm(req, res, idUpdate) {
    //     fs.readFile('views/products/edit.html', 'utf-8', async (err, data) => {
    //         if (err) {
    //             console.log('File NotFound!');
    //         } else {
    //             let cost = await this.cost.getCost(idUpdate);
    //             if (cost.length > 0){
    //                 data = data.replace('{id}', product[0].id);
    //                 data = data.replace('{name}', product[0].name);
    //             }
    //             res.writeHead(200, {'Content-Type': 'text/html'});
    //             res.write(data);
    //             return res.end();
    //         }
    //     });
    // }

    // editCost(req, res, id){
    //     let data = '';
    //     req.on('data', chunk => {
    //         data += chunk;
    //     });
    //     req.on('end', () => {
    //         let cost = qs.parse(data);
    //         this.cost.updateCost(id, cost);
    //         res.writeHead(301, {
    //             location: '/costs'
    //         });
    //         return res.end();
    //     });
    // }
}

module.exports =CostCateController;