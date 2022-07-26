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

    getdetailCost(id){
        return new Promise((resolve, reject) => {
            this.connection.query(`select * from Costs where costcategorieid = ${id}; `, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    };

    createCost(cost,idinput) {
        let insertQuery = `insert into Costs(costdate, note, money,daylimit,weeklimit,monthlimit,userid,costcategorieid)
                           VALUES ('${cost.costdate}', '${cost.note}', ${cost.money}, ${cost.daylimit}, ${cost.weeklimit}, ${cost.monthlimit}, ${cost.userid}, ${idinput})`;
        return new Promise((resolve, reject)=>{
            this.connection.query(insertQuery, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve('Insert success')
                }
            });
        })

    }

    getCost(id) {
        return new Promise((resolve, reject) => {
            let query = `select * from Costs where id = ${id}`;
            this.connection.query(query, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    };

    updateCost(id, cost) {
        let query = `update costs set costdate = '${cost.costdate}', note = '${cost.note}', money= ${cost.money}, daylimit= ${cost.daylimit}, weeklimit= ${cost.weeklimit}, monthlimit= ${cost.monthlimit}, userid= ${cost.userid} where id= ${id}`;
        this.connection.query(query, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Update success')
            }
        })
    };

    getcostcategorieid(id){
        let query = `select * from costs where id = ${id}`;
        return new Promise((resolve,reject)=>{
            this.connection.query(query, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data)
                }
            })
        })
    };

    deleteCost(id){
        let query = `delete from Costs where id = ${id}`;
        return new Promise((resolve,reject)=>{
            this.connection.query(query, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data)
                }
            })
        })


    };


}


module.exports = Cost;