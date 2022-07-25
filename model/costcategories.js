const Connection = require('./connection');

class costcategories {

    constructor() {
        this.connection = Connection.createConnection();
        this.connection.connect((err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('Connect success!');
            }
        });
    }

    getCostsCategories() {
        return new Promise((resolve, reject) => {

            this.connection.query('select * from CostCategories', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    createCostCate(cost) {
        let insertQuery = `insert into CostCategories(name)
                           VALUES ('${cost.name}')`;
        this.connection.query(insertQuery, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Insert success')
            }
        });
    }

    getCostCategories(id) {
        return new Promise((resolve, reject) => {
            let query = `select *
                         from CostCategories
                         where id = ${id}`;
            this.connection.query(query, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    updateCost(id, cost) {
        let query = `update CostCategories set name = '${cost.name}' where id = ${id}`;
        this.connection.query(query, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Update success')
            }
        })
    }

    deleteCostCategories(id){
        let query = `delete from CostCategories where id = ${id}`;
        this.connection.query(query, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Delete success')
            }
        })
    }
}

module.exports = costcategories;