const mysql = require('mysql');

class Connection {

    static createConnection() {
        let configToMySQL = {
            host: 'localhost',
            user: 'root',
            password: '123456',
            database: 'Case_Study'
        };
        return mysql.createConnection(configToMySQL);
    }
}
module.exports = Connection;