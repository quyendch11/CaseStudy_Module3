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

    query(sql) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }
    async createIncomes(income) {
        let insertQuery = /*html*/`INSERT INTO Incomes (incomedate,note,money,userid,incomeCategorieid)
                            values('${income.incomedate}','${income.note}',${income.money},${1},${income.incomeCategorieid})`;

        return await this.query(insertQuery)
    };

    async getCategoryIncome() {
        let sql = "SELECT * FROM IncomeCategories";
        return await this.query(sql)
    }

    getId(id) {

        let query = /*html*/ `select * from incomes where id = ${id}`;
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });

        });

    }
    updateEdit(id, income) {
        let query =/*html*/ `update Incomes set 
        incomedate = '${income.incomedate}',note = '${income.note}',money = ${income.money},incomeCategorieid = ${income.incomeCategorieid}
        where id = ${id}`;
        console.log(query);
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, data) => {
                if (err) {
                    reject(err);
                }
                // console.log(data);
                resolve(data);
            });
        });
    }
    deleteLineOfIncomes(id) {
        let query = /*html*/ `delete  from incomes where id=${id}`;
        console.log(query);
        return new Promise((resolve, reject) => {
            this.connection.query((query), (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }
}
module.exports = Incomes;