const Connection = require('./connection');
const {promises} = require("fs");
const url = require("url");

class CityModel {
    constructor() {
        this.connection = Connection.createConnection();
        this.connection.connect((err)=> {
            if (err){
                console.log(err)
            }else {
                console.log('connection success')
            }
        });
    }
    getCitys() {
        return new Promise((resolve,reject)=> {
            this.connection.query('select * from city;',(err,data)=> {
                if (err) {
                    reject(err)
                }else {
                    resolve(data)
                }
            })
        })
    }
    getCity(idUpdate) {
        return new Promise((resolve,reject)=> {
            let query = `select * from city where id = ${idUpdate}`;
            this.connection.query(query,(err,data)=> {
                if (err){
                    reject(err)
                }else {
                    resolve(data)
                }
            })
        })
    }
}
module.exports = CityModel;