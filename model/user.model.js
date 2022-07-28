const Connection = require('./connetion');
const {promises} = require("fs");
const url = require("url");



class UserModel {
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
    getUser() {
        return new Promise((resolve,reject)=> {
            this.connection.query('select * from users;',(err,data)=> {
                if (err) {
                    reject(err)
                }else {
                    resolve(data)
                }
            })
        })
    }
    delete(userId) {
        return new Promise((resolve,reject)=> {
            let query = `delete from users where id = ${userId}`;
            this.connection.query(query,(err,data)=> {
                if (err) {
                    reject(err)
                }else {
                    resolve(data)
                }
            });
        })
    }
    // search(users,name) {
    //     return new Promise((resolve,reject)=> {
    //         let querySearch = `select * from users where usename = ${name}  `;
    //         this.connection.query(querySearch,(err,data)=> {
    //             if (err) {
    //                 reject(err)
    //             }else {
    //                 resolve(data)
    //             }
    //         })
    //     })
    // }

    // lấy thông tin user
    getUsers(idUpdate) {
        return new Promise((resolve,reject)=> {
            let query = `select * from users where id = ${idUpdate}`;
            this.connection.query(query,(err,data)=> {
                if (err){
                    reject(err)
                }else {
                    resolve(data)
                }
            })
        })
    }

    userUpdate(id,user) {
        let query = `update users set usename = '${user.usename}', password = '${user.password}', status= '${user.status}' where id = ${id}`;
        this.connection.query(query, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Update success')
            }
        })
    }
}
module.exports = UserModel;