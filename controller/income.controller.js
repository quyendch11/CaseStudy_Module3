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
                fs.readFile(
                    "view/client/income/income.index.html",
                    "utf-8",
                    async (err, dataIncomes) => {
                        if (err) {
                            console.log("File NotFound!");
                        } else {
                            let incomesList = await incomes.getIncomesList()

                            let tbody = "";
                            for (let index = 0; index < incomesList.length; index++) {
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
                            <td>${incomesList[index].incomedate}</td>
                            <td>${incomesList[index].note}</td>
                            <td>${incomesList[index].money}</td>
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

                            // incomesList.map((incomes, index) => {
                            //     tbody += /*html*/`</tr>
                            //     <td>${index + 1}</td>
                            //     <td>${incomes.note}</td>
                            //     <td>${incomes.money}</td>
                            //     <td>${incomes.incomedate}</td>
                            //     <td><a href="/incomesList/edit/${incomes.id}" class="btn btn-primary">Edit</a></td>
                            //     <td ><a href="/incomesList/delete/${incomes.id}" class="btn btn-danger" >Delete</a></td>
                            //   </tr>`
                            // });
                            dataIncomes = dataIncomes.replace('{incomesList}', tbody);

                            data = data.replace("{content-main}", dataIncomes);
                            res.writeHead(200, { 'Content-type': 'text/html' });
                            res.write(data);
                            res.end();
                        }
                    }
                );
            }
        });
    }

    showIncomesForm(req, res) {
        fs.readFile("view/client/index.html", 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
            }
            else {
                fs.readFile(
                    "view/client/income/create.html",
                    "utf-8",
                    (err, dataIncomes) => {
                        if (err) {
                            console.log("File NotFound!");
                        } else {
                            
                            //     incomes.getCategoryIncome().then((category) => {

                            //     });

                            //     data = data.replace('{item-category}', html)
                            //     res.writeHead(200, { 'Content-Type': 'text/html' });
                            //     res.write(data);
                            //     return res.end();
                            // }

                            //         let tbody = "";
                            //         for (let index = 0; index < incomesList.length; index++) {
                            //             tbody += /*html */ `
                            //       <tr role="row" class="odd active">
                            //         <td class=" dt-right" tabindex="0">
                            //         <label
                            //           class="m-checkbox m-checkbox--single m-checkbox--solid m-checkbox--brand">
                            //           <input type="checkbox" value="" class="m-checkable">
                            //           <span></span>
                            //         </label>
                            //         </td>
                            //         <td>${index + 1}</td>
                            //         <td>${incomesList[index].incomedate}</td>
                            //         <td>${incomesList[index].note}</td>
                            //         <td>${incomesList[index].money}</td>
                            //         <td nowrap="">
                            //             <a href="#"
                            //                 class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill"
                            //                 title="View">
                            //                 <i class="la la-edit"></i>
                            //             </a>
                            //             <a href="#"
                            //                 class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill"
                            //                 title="View">
                            //                 <i class="flaticon-close"></i>
                            //             </a>
                            //         </td>
                            //       </tr>`;
                            
                                dataIncomes = dataIncomes.replace('{content-main}',data)
                                res.writeHead(200, { 'Content-Type': 'text/html' });
                                res.write(dataIncomes);
                                return res.end();
                            
                            //         dataIncomes = dataIncomes.replace('{incomesList}', tbody);
                            // data = data.replace("{content-main}", dataIncomes);
                            // res.writeHead(200, { 'Content-type': 'text/html' });


                        }
                    }
                );
            }
        });
    };

    createIncomeForm(req, res) {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
            let income = qs.parse(data);
            incomes.createIncomes(income).then(() => {
                res.writeHead(301, {
                    location: '/incomesList'
                });
                return res.end();
            }).catch(err => {
                console.log(err.message);
            })
        })
    };
    showEditIncomeForm(req, res) {
        let idUpdate = req.params.id;
        console.log(idUpdate);
        fs.readFile('view/client/income/edit.html', 'utf-8', async (err, data) => {
            if (err) {
                console.log(err);
            }
            else {
                let income = await incomes.getId(idUpdate);
                if (income.length > 0) {
                    data = data.replace('{id}', income[0].id);
                    data = data.replace('{incomedate}', income[0].incomedate);
                    data = data.replace('{note}', income[0].note);
                    data = data.replace('{money}', income[0].money);
                }
                incomes.getCategoryIncome().then((categories) => {
                    let html = '';

                    categories.forEach((category) => {
                        html += '<option value="' + category.id + '">' + category.name + '</option>';
                    });

                    data = data.replace('{item-category}', html)
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(data);
                    return res.end();
                })

            }

        });
    };

    editIncome(req, res) {
        let id = req.params.id;
        let data = '';
        req.on('data', chunk => {
            data += chunk
        });
        req.on('end', async () => {
            let income = qs.parse(data);

            // console.log(income);

            await incomes.updateEdit(id, income);
            res.writeHead(301, {
                location: '/incomesList'
            });
            return res.end();

        })

    };
    delete(req, res) {
        let id = req.params.id;
        console.log(id);
        incomes.deleteLineOfIncomes(id)
        res.writeHead(301, {
            location: '/incomesList'
        });
        return res.end();
    };
};
module.exports = IncomesController;