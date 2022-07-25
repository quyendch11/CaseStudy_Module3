const Connection = require('./connection');


class Cost {
    constructor() {
        this.connection = Connection.createConnection();
        this.connection.connect((err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('Connect success!');
            }
        });
    };

    getdetailCost(idinput){
        return new Promise((resolve, reject) => {

            this.connection.query(`select * from Costs where costCategorieid = ${idinput}; `, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
}


module.exports = Cost;