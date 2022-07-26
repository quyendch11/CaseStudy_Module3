const fs = require('fs');
const qs = require('qs');

const cost_controller = require('../model/costs');
const  costs = new cost_controller();
class costController {

    showCostListPage(req, res) {
        let idUpdate = req.params.id;
        fs.readFile('views/detailcost.html', 'utf-8', async (err, data) => {
            if (err) {
                console.log('File NotFound!');
            } else {
                let costsdetail = await costs.getdetailCost(idUpdate);
                let tbody = '';
                for (let index = 0; index < costsdetail.length; index++) {
                    tbody += `<tr>
                    <td>${index + 1}</td>
                    <td>${costsdetail[index].costdate}</td>
                    <td>${costsdetail[index].note}</td>
                    <td>${costsdetail[index].money}</td>
                    <td>${costsdetail[index].daylimit}</td>
                    <td>${costsdetail[index].weeklimit}</td>
                    <td>${costsdetail[index].monthlimit}</td>
                    <td><a href="/costcategories/edit/${costsdetail[index].id}" class="btn btn-primary">edit</a></td>
                    <td><a href="/cost/detail/${costsdetail[index].id}" class="btn btn-danger" onclick="confirm('are you sure')">Delete</a></td>
                </tr>`;
                }
                data = data.replace('{detailcost}', tbody);
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                return res.end();
            }
        });
    }

    showCostFormCreate(req, res) {
        fs.readFile('views/setcategories.html', 'utf-8', (err, data) => {
            let idinput = req.params.id;
            if (err) {
                console.log('File NotFound!');
            } else {
                data = data.replace("{id}", idinput)
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                return res.end();
            }
        });
    }

    createCosts(req, res) {
        let idinput = req.params.id;
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => {
            let cost = qs.parse(data);
            costs.createCost(cost,idinput);
            res.writeHead(301, {
                location: '/costcategories'
            });
            return res.end();
        });
    };

    showCostEditForm(req,res){
        let idedit = req.params.id;
        fs.readFile('views/editcost.html','utf-8',async (err,data)=>{
            if(err){
                console.log(err);
            }else {
                let cost = await costs.getCost(idedit);
                if (cost.length > 0) {
                    data = data.replace('{id}',idedit);
                    data = data.replace('{costdate}', cost[0].costdate);
                    data = data.replace('{money}', cost[0].money);
                    data = data.replace('{note}', cost[0].note);
                    data = data.replace('{daylimit}', cost[0].daylimit);
                    data = data.replace('{weeklimit}', cost[0].weeklimit);
                    data = data.replace('{monthlimit}', cost[0].monthlimit);
                    data = data.replace('{userid}', cost[0].userid);
                }
                res.writeHead(200,{'Content-Type':'text/html'});
                res.write(data);
                return res.end();

            }
        })
    };


    editCost(req, res) {
        let idedit = req.params.id;
            let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', async () => {
            let cost = qs.parse(data);
            costs.updateCost(idedit, cost);
            let currentCost = await costs.getcostcategorieid(idedit)
            res.writeHead(301, {
                location: `/costcategories/detail/${currentCost[0].costCategorieid}`
            });
            return res.end();
        });
    };

   async deleteCost(req,res){
        let iddelete = req.params.id;
       let currentCost = await costs.getcostcategorieid(iddelete);
        await costs.deleteCost(iddelete);
        res.writeHead(301, {
            location: `/costcategories/detail/${currentCost[0].costCategorieid}`
        });
        return res.end();
    }

}

module.exports = costController;