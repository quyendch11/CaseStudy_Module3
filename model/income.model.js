const Connection = require('./connetion');


class Incomes {
    constructor() {
        this.connection = Connection.createConnection();
        this.connection.connect((err) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Connection established!");
            }
        });
    };
    getIncomesList() {
        return new Promise((resolve, reject) => {
            this.connection.query('select * from Incomes', (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    };
    createIncomes() {
        let insertQuery = /*html*/`INSERT INTO Incomes (note,money,incomedate)
                            value('${incomes.note},${incomes.money},${incomes.incomedate}')`;
        this.connection.query(insertQuery, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Insert successfully!');
            }
        });
    };
    getId(id){
    return new Promise((resolve, reject) => {
        let query = /*html*/ `select * from incomes where id = ${id}`;
        this.connection.query(query, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
        });
    }
    getEdit(id,incomes){
        let query =/*html*/ `update incomes set 
        note = ${incomes.note},money = ${incomes.money},incomedate = ${incomes.incomedate} 
        where id = ${id}`;
        this.connection.query(query,(err, data)=>{
            if(err){
                reject(err);
            }
            resolve(data);
        });
    }
    deleteLineOfIncomes(id){
        let query = /*html*/ `delete  from incomes where id=${id}`;
        this.connection.query((query),(err, data) => {
            if(err){
                reject(err);
            }
            resolve(data);
        });
    }
}
module.exports = Incomes;